import React from 'react'
import GdsHeading2 from '../../../src/components/gds-heading2/gds-heading2'
import GdsParagraph from '../../../src/components/gds-paragraph/gds-paragraph'
import GdsTabs from '../../../src/components/gds-tabs/gds-tabs'
import ContentTemplate from '../../../src/components/templates/content/content-template'
import { findProfessionDetails } from '../../../src/server/services/profession-service'
import { booleanToDisplayString, getExistingValidationErrors, validateQuery } from '../../../src/shared'
import { GeneralDetails, ProfessionDetails, RegulatoryAuthorityDetails } from '../../../src/types'
import { schema } from '../../../src/schemas/profession-details-schema'
import styles from './[professionName].module.scss'
import GdsLink from '../../../src/components/gds-link/gds-link'
import GdsHeading3 from '../../../src/components/gds-heading3/gds-heading3'
import GdsInsetText from '../../../src/components/gds-inset-text/gds-inset-text'
import useGdsScripts from '../../../src/components/use-gds-scripts/use-gds-scripts'
import GdsBulletList from '../../../src/components/gds-bullet-list/gds-bullet-list'

interface ProfessionDetailsProps {
    profession: ProfessionDetails
}

interface ProfessionDetailsState {
    profession: ProfessionDetails
}

export async function getServerSideProps(context) {
    const { professionName, professionNameOrNation: nation } = context.query

    if(!professionName || !nation) {
        return { notFound: true }
    }

    const serverSideProps: { 
        props: ProfessionDetailsProps, 
        notFound?: boolean 
    } = {
        props: {
            profession: null,
        },
    }

    let errors = getExistingValidationErrors(context)

    if(!errors) {
        errors = await validateQuery(context.query, schema)
    }

    if(!errors) {
        const profession = await findProfessionDetails(professionName, nation)

        if(!profession) {
            serverSideProps.notFound = true
        } else {
            serverSideProps.props.profession = profession
        }
    } else {
        serverSideProps.notFound = true
    }

    return serverSideProps
}

const tableHeaderClassName = `govuk-table__header ${styles['regulated-profession-details__fieldName']}`
const tableCellClassName = `govuk-table__cell ${styles['regulated-profession-details__fieldValue']}`

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

const getGeneralInformation = (generalDetails: GeneralDetails) => {
    return (
        <table className="govuk-table">
            <tbody className="govuk-table__body">
                <tr className="govuk-table__row">
                    <th scope="row" className={tableHeaderClassName}>Name of regulated profession</th>
                    <td className={tableCellClassName}>{generalDetails.title}</td>
                </tr>
                <tr className="govuk-table__row">
                    <th scope="row" className={tableHeaderClassName}>Country</th>
                    <td className={tableCellClassName}>United Kingdom</td>
                </tr>
                <tr className="govuk-table__row">
                    <th scope="row" className={tableHeaderClassName}>Nation</th>
                    <td className={tableCellClassName}>{generalDetails.nation}</td>
                </tr>
                <tr className="govuk-table__row">
                    <th scope="row" className={tableHeaderClassName}>National legislation</th>
                    <td className={tableCellClassName}>{generalDetails.nationalLegislation}</td>
                </tr>
                <tr className="govuk-table__row">
                    <th scope="row" className={tableHeaderClassName}>Legislation link</th>
                    <td className={tableCellClassName}>
                        { generalDetails.legislationLink ? 
                        <GdsLink href={generalDetails.legislationLink}>{generalDetails.legislationLink}</GdsLink> :
                        "N/A" }
                    </td>
                </tr>
                <tr className="govuk-table__row">
                    <th scope="row" className={tableHeaderClassName}>Qualification level</th>
                    <td className={tableCellClassName}>{generalDetails.qualificationLevel}</td>
                </tr>
                <tr className="govuk-table__row">
                    <th scope="row" className={tableHeaderClassName}>Reserved activities</th>
                    <td className={tableCellClassName}>{generalDetails.reservedActivities}</td>
                </tr>
                <tr className="govuk-table__row">
                    <th scope="row" className={tableHeaderClassName}>Methods to obtain qualification</th>
                    <td className={tableCellClassName}>{generalDetails.obtainQualificationsMethod}</td>
                </tr>
                <tr className="govuk-table__row">
                    <th scope="row" className={tableHeaderClassName}>Duration of qualification</th>
                    <td className={tableCellClassName}>{generalDetails.durationEducation}</td>
                </tr>
                <tr className="govuk-table__row">
                    <th scope="row" className={tableHeaderClassName}>Most common path to obtain qualification</th>
                    <td className={tableCellClassName}>{generalDetails.pathObtainQualifications}</td>
                </tr>
                <tr className="govuk-table__row">
                    <th scope="row" className={tableHeaderClassName}>Existence of mandatory professional experience</th>
                    <td className={tableCellClassName}>{booleanToDisplayString(generalDetails.mandatoryTraineeship)}</td>
                </tr>
                <tr className="govuk-table__row">
                    <th scope="row" className={tableHeaderClassName}>Mandatory registration with professional bodies</th>
                    <td className={tableCellClassName}>{booleanToDisplayString(generalDetails.mandatoryRegistrationInProfessionalBodies)}</td>
                </tr>
                <tr className="govuk-table__row">
                    <th scope="row" colSpan={2} className={tableHeaderClassName}>Description of activities/regulation description</th>
                </tr>
                <tr className="govuk-table__row">
                    <td colSpan={2} className={tableCellClassName}>{generalDetails.regulationDescription}</td>
                </tr>
            </tbody>
        </table>
    )
}

class ProfessionDetailsTabs extends React.Component<ProfessionDetailsProps, ProfessionDetailsState> {

    constructor(props: ProfessionDetailsProps) {
        super(props)

        this.state = {
            profession: props.profession,
        }
    }

    render() {
        const { name, generalDetails, regulatoryAuthority } = this.state.profession
        const generalInformationTab = getGeneralInformation(generalDetails)
        const regulatoryAuthorityTab = getRegulatoryAuthority(regulatoryAuthority)
        const caption = regulatoryAuthority.name
        const relatedContent = [
            {
                href: '/',
                label: 'Search related professions'
            },
        ]

        const tabTitles = [
            {
                id: 'general-information',
                tab: <span>Profession information</span>,
            },
            {
                id: 'regulatory-authority',
                tab: <span>Contact details</span>,
            },
            {
                id: 'recognition-decisions',
                tab: <span>Application figures</span>,
            }
        ]
        const id = 'regulated-profession-details'

        return (
            <ContentTemplate relatedContent={relatedContent} caption={caption} pageTitle={name} backLink="/check-a-regulated-profession">
                <GdsTabs title={name} id={id} className={styles[id]} tabTitles={tabTitles}>
                    {generalInformationTab}
                    {regulatoryAuthorityTab}
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

export default useGdsScripts(ProfessionDetailsTabs)