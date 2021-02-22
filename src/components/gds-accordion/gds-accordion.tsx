
export default function GdsAccordion({ id, children }) {
    return (
        <div className="govuk-accordion" data-module="govuk-accordion" id={id}>
            {children}
        </div>
    )
}