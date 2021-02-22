export default function GdsErrorSummary({ errors }) {
    let listItems = []

    if(errors) {
        listItems = Object.keys(errors)?.map((field, i) => (
            <li key={`errors_${i}`}>
                <a href={`#${field}`}>{errors[field]}</a>
            </li>
        ))
    }

    return listItems?.length > 0 ? (
        <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex={-1} data-module="govuk-error-summary">
            <h2 className="govuk-error-summary__title" id="error-summary-title">
                There is a problem
            </h2>
            <div className="govuk-error-summary__body">
                <ul className="govuk-list govuk-error-summary__list">
                    {listItems}
                </ul>
            </div>
        </div>
    ) : <></>
}