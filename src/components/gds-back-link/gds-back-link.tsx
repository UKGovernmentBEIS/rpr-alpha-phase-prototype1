const goBack = () => {
    window.history.back();
}

export default function GdsBackLink({ href }) {
    return (
        <a href='#' onClick={goBack} className="govuk-link govuk-back-link">Back</a>
    )
}