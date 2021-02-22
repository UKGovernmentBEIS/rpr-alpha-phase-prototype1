import React from 'react'
import GdsHeading2 from '../../src/components/gds-heading2/gds-heading2'
import GdsParagraph from '../../src/components/gds-paragraph/gds-paragraph'
import GdsTabs from '../../src/components/gds-tabs/gds-tabs'
import ContentTemplate from '../../src/components/templates/content/content-template'
import { findRegulatoryAuthorityDetails } from '../../src/server/services/regulatory-authority-service'
import { getExistingValidationErrors, getLinkForSearchResult, validateQuery } from '../../src/shared'
import { RegulatoryAuthorityDetails } from '../../src/types'
import { schema } from '../../src/schemas/regulatory-authority-details-schema'
import styles from './[regulatoryAuthorityName].module.scss'
import GdsLink from '../../src/components/gds-link/gds-link'
import GdsHeading3 from '../../src/components/gds-heading3/gds-heading3'
import GdsInsetText from '../../src/components/gds-inset-text/gds-inset-text'
import useGdsScripts from '../../src/components/use-gds-scripts/use-gds-scripts'
import GdsRow from '../../src/components/gds-table/gds-row'
import GdsCell from '../../src/components/gds-table/gds-cell'
import GdsTable from '../../src/components/gds-table/gds-table'
import GdsBulletList from '../../src/components/gds-bullet-list/gds-bullet-list'

interface RegulatoryAuthorityDetailsProps {
    regulatoryAuthority: RegulatoryAuthorityDetails
}

interface RegulatoryAuthorityDetailsState {
    regulatoryAuthority: RegulatoryAuthorityDetails
}

export async function getServerSideProps(context) {
    const { regulatoryAuthorityName } = context.query

    if(!regulatoryAuthorityName) {
        return { notFound: true }
    }

    const serverSideProps: { 
        props: RegulatoryAuthorityDetailsProps, 
        notFound?: boolean 
    } = {
        props: {
            regulatoryAuthority: null,
        },
    }

    let errors = getExistingValidationErrors(context)

    if(!errors) {
        errors = await validateQuery(context.query, schema)
    }

    if(!errors) {
        const regulatoryAuthority = await findRegulatoryAuthorityDetails(regulatoryAuthorityName)

        if(!regulatoryAuthority) {
            serverSideProps.notFound = true
        } else {
            serverSideProps.props.regulatoryAuthority = regulatoryAuthority
        }
    } else {
        serverSideProps.notFound = true
    }

    return serverSideProps
}

const getRegulatoryAuthority = (regulatoryAuthorityDetails: RegulatoryAuthorityDetails) => {
    return (
        <>
            <GdsHeading3>
                Contact the regulatory authority if you want to:
            </GdsHeading3>
            <GdsBulletList id="ra-introduction" description="">
                <span>Get more information about a profession they regulate</span>
	            <span>Have your qualification officially recognised</span>
	            <span>Register your qualification</span>
            </GdsBulletList>
            <GdsInsetText>
                <strong>{regulatoryAuthorityDetails.name}</strong><br />
                {regulatoryAuthorityDetails.street}<br />
                {regulatoryAuthorityDetails.city}<br />
                {regulatoryAuthorityDetails.postCode}<br />
            </GdsInsetText>
            <GdsInsetText>
                Email: { regulatoryAuthorityDetails.emailAddress ? 
                    <GdsLink href={`mailto:${regulatoryAuthorityDetails.emailAddress}`}>{regulatoryAuthorityDetails.emailAddress}</GdsLink> :
                    "N/A" }<br />
                URL: { regulatoryAuthorityDetails.website ?
                    <GdsLink href={regulatoryAuthorityDetails.website}>{regulatoryAuthorityDetails.website}</GdsLink> :
                    "N/A" } <br />
                Phone: {regulatoryAuthorityDetails.phoneNumber}<br />
                <GdsLink href="/call-charges">Find out about call charges</GdsLink>
            </GdsInsetText>
            <GdsParagraph className="govuk-body-s">
                When a professional wants to practise their regulated profession in a UK nation, they need to apply to the relevant regulatory authority. Regulatory authorities are responsible for taking a decision on whether a professional has  the right to practise in their nation.
            </GdsParagraph>
        </>
    )
}

const getRegulatedProfessions = (regulatoryAuthorityDetails: RegulatoryAuthorityDetails) => {
    const tableId = 'regulated-professions'
    const regulatedProfessions = regulatoryAuthorityDetails.regulatedProfessions

    const regulatedProfessionsRows = regulatedProfessions.map((regulatedProfession, i) => (
        <GdsRow key={`${tableId}__row__${i}`} id={`${tableId}__row__${i}`}>
            <GdsCell>
                <GdsLink href={getLinkForSearchResult(regulatedProfession)}>{regulatedProfession.name}</GdsLink>
            </GdsCell>
        </GdsRow>
    ))

    return (
        <>
            <GdsParagraph>
                <strong>Professions regulated by the {regulatoryAuthorityDetails.name}</strong>
            </GdsParagraph>
            <GdsTable id={tableId} columnHeaders={[]}>
                {regulatedProfessionsRows}
            </GdsTable>
            {
                regulatedProfessions.length === 0 ?
                    (<GdsParagraph>
                        No Results
                    </GdsParagraph>)
                : <></>
            }
        </>
    )
}

class RegulatoryAuthorityDetailsTabs extends React.Component<RegulatoryAuthorityDetailsProps, RegulatoryAuthorityDetailsState> {

    constructor(props: RegulatoryAuthorityDetailsProps) {
        super(props)

        this.state = {
            regulatoryAuthority: props.regulatoryAuthority,
        }
    }

    render() {
        const regulatoryAuthority = this.state.regulatoryAuthority
        const regulatedProfessionsTab = getRegulatedProfessions(regulatoryAuthority)
        const regulatoryAuthorityTab = getRegulatoryAuthority(regulatoryAuthority)

        const relatedContent = [
            {
                href: '/',
                label: 'Search related professions'
            },
        ]

        const tabTitles = [
            {
                id: 'regulatory-authority',
                tab: <span>Contact details</span>,
            },
            {
                id: 'regulated-professions',
                tab: <span>Regulated professions</span>,
            },
            {
                id: 'recognition-decisions',
                tab: <span>Application figures</span>,
            }
        ]
        const id = 'regulatory-authority-details'

        return (
            <ContentTemplate relatedContent={relatedContent} pageTitle={regulatoryAuthority.name} backLink="/find-a-regulatory-authority">
                <GdsTabs title={regulatoryAuthority.name} id={id} className={styles[id]} tabTitles={tabTitles}>
                    {regulatoryAuthorityTab}
                    {regulatedProfessionsTab}
                    <div>TBD</div>
                </GdsTabs>
                <GdsHeading2>Share or print this page</GdsHeading2>
                <GdsParagraph className={styles['share-icons']}>
                    {/* source of icons: https://github.com/alphagov/govuk_publishing_components/blob/master/app/views/govuk_publishing_components/components/_share_links.html.erb */}
                    <GdsLink href='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="9 9 32 32" aria-hidden="true">
                            <path fill="currentColor" d="M9 9h32v32H9V9z"/>
                            <path fill="#FFF" d="M34.983 18.76v12.48H15.016V18.76h19.967m2.496-2.496H12.52v17.472h24.959V16.264z"/><path fill="none" stroke="#FFF" stroke-width="2.496" stroke-miterlimit="10" d="M14.59 18.963L25 26.945l10.263-7.869"/>
                        </svg>
                        <span>
                            Email
                        </span>
                    </GdsLink>
                    <GdsLink href='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="32" height="32" viewBox="9 9 32 32" aria-hidden="true">
                            <path fill="currentColor" d="M9 9h32v32H9V9z"/>
                            <path fill="#FFF" d="M19.24 35.24V21.8h-4.48v13.44h4.48z"/><defs><path d="M9 9h32v32H9z"/></defs><clipPath><use xlinkHref="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FFF" d="M26.28 35.24V28.2c0-1.92.64-3.2 1.92-3.2h.64c1.28 0 1.92 1.28 1.92 4.48v5.76h4.48V28.2c0-4.48-1.28-6.4-4.48-6.4-3.84 0-4.479 1.92-4.479 1.92V21.8H21.8v13.44h4.48zm-6.72-17.92a2.56 2.56 0 1 1-5.12 0 2.56 2.56 0 0 1 5.12 0"/>
                        </svg>
                        <span>
                            Linkedin
                        </span>
                    </GdsLink>
                    <GdsLink href='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="9 9 32 32" aria-hidden="true">
                            <path fill="currentColor" d="M9 9h32v32H9V9z"/>
                            <path fill="#FFF" d="M34.983 18.76v12.48H15.016V18.76h19.967m2.496-2.496H12.52v17.472h24.959V16.264z"/><path fill="none" stroke="#FFF" stroke-width="2.496" stroke-miterlimit="10" d="M14.59 18.963L25 26.945l10.263-7.869"/>
                        </svg>
                        <span>
                            Print
                        </span>
                    </GdsLink>
                </GdsParagraph>
            </ContentTemplate>
        )
    }
}

export default useGdsScripts(RegulatoryAuthorityDetailsTabs)