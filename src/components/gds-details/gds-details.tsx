export type GdsDetailsProps = {
    linkText: string
    detailsText: string
}

export default function GdsDetails({ linkText, detailsText }: GdsDetailsProps) {
    return (
        <details className="govuk-details" data-module="govuk-details">
            <summary className="govuk-details__summary">
                <span className="govuk-details__summary-text">
                    {linkText}
                </span>
            </summary>
            <div className="govuk-details__text">
                {detailsText}
            </div>
        </details>
    )
}