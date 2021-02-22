import Head from 'next/head'
import React from 'react'
import GdsAccordion from '../src/components/gds-accordion/gds-accordion'
import GdsAccordionSection from '../src/components/gds-accordion/gds-accordion-section'
import { getLinkForSearchResult } from '../src/shared'
import GdsLink from '../src/components/gds-link/gds-link'
import ContentTemplate from '../src/components/templates/content/content-template'
import useGdsScripts from '../src/components/use-gds-scripts/use-gds-scripts'
import { getAllIndustrySummaries } from '../src/server/services/industry-service'
import { IndustrySummary } from '../src/types'
import GdsList from '../src/components/gds-list/gds-list'

const pageTitle = 'Find a regulated profession by industry or sector'
const previousHref = '/'
const id = 'regulated-professions__accordion'

interface ProfessionsProps {
    allIndustries: IndustrySummary[]
}

export async function getServerSideProps() {
    const allIndustries = await getAllIndustrySummaries()

    if(!allIndustries) {
        throw new Error('Could not retrieve professions from database')
    }

    return { 
        props: {
            allIndustries
        }
    }
}

class Professions extends React.Component<ProfessionsProps> {
    constructor(props: ProfessionsProps) {
        super(props)
    }

    render() {
        const { allIndustries } = this.props

        const accordionSections = allIndustries.map((industrialArea, i) => {
            const professionLinks = industrialArea.regulatedProfessions.map((profession, i) => (
                <GdsLink key={`${id}__prof__${i}`} href={getLinkForSearchResult(profession)}>{profession.name}</GdsLink>
            ))

            return (
                <GdsAccordionSection header={industrialArea.name} key={`${id}-${i}`} id={`${id}-${i}`}>
                    <GdsList id={`${id}-${i}__list`}>
                        {professionLinks}
                    </GdsList>
                </GdsAccordionSection>
            )
        })

        return (
            <ContentTemplate pageTitle={pageTitle} backLink={previousHref}>
                <Head>
                    <title>{pageTitle}</title>
                </Head>
                <GdsAccordion id={id}>
                    {accordionSections}
                </GdsAccordion>
            </ContentTemplate>
        )
    }
}

export default useGdsScripts(Professions)