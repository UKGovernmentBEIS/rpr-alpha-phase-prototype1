import Link from 'next/link'

export default function GdsAlphaBanner() {
    return (
        <div className="govuk-width-container app-width-container">
            <div className="govuk-phase-banner">
            <p className="govuk-phase-banner__content">
                <strong className="govuk-tag govuk-phase-banner__content__tag">
            alpha
            </strong>
                <span className="govuk-phase-banner__text">
                This is a new service – your <Link href="/"><a className="govuk-link">feedback</a></Link> will help us to improve it.
                </span>
            </p>
            </div>
        </div>
    )
}