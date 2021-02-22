import React from "react"
import ContentTemplate from '../../src/components/templates/content/content-template'
import { schema } from '../../src/schemas/search-regulated-profession-schema'
import { ProfessionSearchResult } from '../../src/types'
import { searchForProfession } from '../../src/server/services/profession-service'
import GdsTable from "../../src/components/gds-table/gds-table"
import GdsRow from "../../src/components/gds-table/gds-row"
import GdsCell from "../../src/components/gds-table/gds-cell"
import GdsLink from "../../src/components/gds-link/gds-link"
import GdsErrorSummary from "../../src/components/gds-error-summary/gds-error-summary"
import GdsParagraph from "../../src/components/gds-paragraph/gds-paragraph"
import Router from "next/router"
import { getExistingValidationErrors, getLinkForSearchResult, validateQuery } from "../../src/shared"
import useGdsScripts from "../../src/components/use-gds-scripts/use-gds-scripts"

interface SearchProps {
    errors: { [ field: string ]: string }
    profession: string
    dataType: string
    searchResults?: ProfessionSearchResult[]
}

interface SearchState {
    profession: string
    dataType: string
    searchResults?: ProfessionSearchResult[]
}

const pageTitle = 'Professions related to your search for '
const noResultsTitle = 'No results for your search'

const performSearch = async (query) => {
    const profession = query['profession']
    const nation = query['where-you-wish-to-practice']
    const searchResults = await searchForProfession(profession, nation)

    return { profession, searchResults }
}

export async function getServerSideProps(context) {
    const request = context.req
    const query = request['query']

    if(!query) {
        context.res.status(400)
        return null
    }

    const props = {
        profession: {},
        searchResults: {},
        errors: {},
        dataType: query['dataType'],
    }

    let errors = getExistingValidationErrors(context)

    if(!errors) {
        errors = await validateQuery(query, schema)
    }

    if(!errors) {
        const { profession, searchResults } = await performSearch(query)
        props.profession = profession
        props.searchResults = searchResults
    } else {
        props.errors = errors
        context.res.status(400)
    }

    return { props }
}

class ProfessionSearch extends React.Component<SearchProps, SearchState> {

    constructor(props: SearchProps) {
        super(props)

        const profession = props.profession || ''

        this.state = {
            profession,
            searchResults: props.searchResults,
            dataType: props.dataType,
        }
    }

    async componentDidMount() {
        const { searchResults, dataType } = this.props

        if (dataType !== 'regulatory-authority' && searchResults && searchResults.length === 1) {
            const searchResult = searchResults[0]
            const redirectLink = getLinkForSearchResult(searchResult);
            await Router.push(redirectLink)
        }
    }

    render() {
        const { profession, searchResults, dataType } = this.state
        const { errors } = this.props
        const columnHeaders = [ 'Official UK title' ]
        const tableId = 'regulated-profs-search-results'

        if(Object.keys(errors).length > 0) {
            return (
                <>
                    <ContentTemplate pageTitle={noResultsTitle} backLink="/check-a-regulated-profession">
                        <GdsErrorSummary errors={errors} />
                    </ContentTemplate>
                </>
            )
        }

        const searchResultRows = searchResults.map((searchResult, i) => (
            <GdsRow key={`${tableId}__row__${i}`} id={`${tableId}__row__${i}`}>
                <GdsCell>
                    <GdsLink href={getLinkForSearchResult(searchResult, dataType)}>{searchResult.name}</GdsLink>
                </GdsCell>
            </GdsRow>
        ))

        return (
            <ContentTemplate pageTitle={`${pageTitle}${profession}`} backLink="/check-a-regulated-profession">
                <GdsTable id={tableId} columnHeaders={columnHeaders}>
                    {searchResultRows}
                </GdsTable>
                {
                    searchResults.length === 0 ?
                        (
                        <>
                            <GdsParagraph>
                                No results found
                            </GdsParagraph>
                            <GdsParagraph>
                                If you can't find the profession you're looking for, try searching for an alternative name or use the{' '}
                                <GdsLink href="/professions">
                                    list of regulated professions.
                                </GdsLink>
                            </GdsParagraph>
                        </>
                        )
                    : <></>
                }
            </ContentTemplate>
        )
    }
}

export default useGdsScripts(ProfessionSearch)