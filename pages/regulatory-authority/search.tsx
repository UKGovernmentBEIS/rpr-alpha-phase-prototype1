import React from "react"
import ContentTemplate from '../../src/components/templates/content/content-template'
import { schema } from '../../src/schemas/search-regulatory-authority-schema'
import GdsLink from "../../src/components/gds-link/gds-link"
import GdsErrorSummary from "../../src/components/gds-error-summary/gds-error-summary"
import GdsParagraph from "../../src/components/gds-paragraph/gds-paragraph"
import Router from "next/router"
import { getExistingValidationErrors, getLinkForRegulatoryAuthorityName, validateQuery } from "../../src/shared"
import useGdsScripts from "../../src/components/use-gds-scripts/use-gds-scripts"
import GdsList from "../../src/components/gds-list/gds-list"
import { searchForRegulatoryAuthority } from "../../src/server/services/regulatory-authority-service"

interface SearchProps {
    errors: { [ field: string ]: string }
    regulatoryAuthority: string
    searchResults?: string[]
}

interface SearchState {
    regulatoryAuthority: string
    searchResults?: string[]
}

const pageTitle = 'Regulatory authorities related to your search for '
const noResultsTitle = 'There were no regulatory authorities matching your search'

const performSearch = async (query) => {
    const regulatoryAuthority = query['regulatory-authority']
    const nation = query['nation']
    const searchResults = await searchForRegulatoryAuthority(regulatoryAuthority, nation)

    return { regulatoryAuthority, searchResults }
}

const getLinkForSearchResult = (regulatoryAuthorityName: string) => getLinkForRegulatoryAuthorityName(regulatoryAuthorityName)

export async function getServerSideProps(context) {
    const request = context.req
    const query = request['query']

    if(!query) {
        context.res.status(400)
        return null
    }

    const props = {
        regulatoryAuthority: {},
        searchResults: {},
        errors: {},
    }

    let errors = getExistingValidationErrors(context)

    if(!errors) {
        errors = await validateQuery(query, schema)
    }

    if(!errors) {
        const { regulatoryAuthority, searchResults } = await performSearch(query)
        props.regulatoryAuthority = regulatoryAuthority
        props.searchResults = searchResults
    } else {
        props.errors = errors
        context.res.status(400)
    }

    return { props }
}

class RegulatoryAuthoritySearch extends React.Component<SearchProps, SearchState> {

    constructor(props: SearchProps) {
        super(props)

        const regulatoryAuthority = props.regulatoryAuthority || ''

        this.state = {
            regulatoryAuthority,
            searchResults: props.searchResults,
        }
    }

    async componentDidMount() {
        const { searchResults } = this.props

        if (searchResults && searchResults.length === 1) {
            const searchResult = searchResults[0]
            const redirectLink = getLinkForSearchResult(searchResult)
            await Router.push(redirectLink)
        }
    }

    render() {
        const { regulatoryAuthority, searchResults } = this.state
        const { errors } = this.props
        const tableId = 'regulatory-authority-search-results'

        if(Object.keys(errors).length > 0) {
            return (
                <>
                    <ContentTemplate pageTitle={noResultsTitle} backLink="/find-a-regulatory-authority">
                        <GdsErrorSummary errors={errors} />
                    </ContentTemplate>
                </>
            )
        }

        const searchResultRows = searchResults.map((searchResult, i) => (
            <GdsLink href={getLinkForSearchResult(searchResult)}>{searchResult}</GdsLink>
        ))

        return (
            <ContentTemplate pageTitle={`${pageTitle}${regulatoryAuthority}`} backLink="/find-a-regulatory-authority">
                <GdsList id={tableId}>
                    {searchResultRows}
                </GdsList>
                {
                    searchResults.length === 0 ?
                        (<GdsParagraph>
                            {noResultsTitle}
                        </GdsParagraph>)
                    : <></>
                }
            </ContentTemplate>
        )
    }
}

export default useGdsScripts(RegulatoryAuthoritySearch)