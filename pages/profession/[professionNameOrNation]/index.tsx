import React from 'react'
import ContentTemplate from '../../../src/components/templates/content/content-template'
import { ProfessionSearchResult } from '../../../src/types'
import GdsParagraph from '../../../src/components/gds-paragraph/gds-paragraph'
import { findProfessionName } from '../../../src/server/services/profession-service'
import { getExistingValidationErrors, getLinkForProfessionName, validateQuery } from '../../../src/shared'
import { schema } from '../../../src/schemas/select-by-nation-schema'
import GdsLink from '../../../src/components/gds-link/gds-link'
import GdsList from '../../../src/components/gds-list/gds-list'
import useGdsScripts from '../../../src/components/use-gds-scripts/use-gds-scripts'

interface SelectByNationProps {
    searchResult: ProfessionSearchResult
}

interface SelectByNationState {
    searchResult: ProfessionSearchResult
}

export async function getServerSideProps(context) {
    const { professionNameOrNation: professionName } = context.query

    if(!professionName) {
        return { notFound: true }
    }

    const serverSideProps: { 
        props: SelectByNationProps, 
        notFound?: boolean 
    } = {
        props: {
            searchResult: null,
        },
    }

    let errors = getExistingValidationErrors(context)

    if(!errors) {
        errors = await validateQuery(context.query, schema)
    }

    if(!errors) {
        const searchResult = await findProfessionName(professionName)

        if(!searchResult) {
            serverSideProps.notFound = true
        } else {
            serverSideProps.props.searchResult = searchResult
        }
    } else {
        serverSideProps.notFound = true
    }

    return serverSideProps
}

class SelectByNation extends React.Component<SelectByNationProps, SelectByNationState> {

    constructor(props: SelectByNationProps) {
        super(props)

        this.state = {
            searchResult: props.searchResult,
        }
    }

    render() {
        const { name, nations } = this.state.searchResult
        const listId = 'profession-nations-search-results'

        const nationRows = nations.map((nation, i) => (
            <span key={`${listId}__item__${i}`}>
                <GdsLink href={getLinkForProfessionName(name, nation)}>{name} ({nation})</GdsLink>
            </span>
        ))

        return (
            <ContentTemplate pageTitle={name} backLink="/check-a-regulated-profession">
                <GdsParagraph>
                    This profession is regulated differently across the UK.
                </GdsParagraph>
                <GdsParagraph>
                    Select from the list below:
                </GdsParagraph>
                <GdsList id={listId}>
                    {nationRows}
                </GdsList>
            </ContentTemplate>
        )
    }
}

export default useGdsScripts(SelectByNation)