export type RadioButtonsOption = {
    value: string
    label: string
}

export type GdsRadioButtonsProps = {
    name: string
    label: string
    options: RadioButtonsOption[]
    isQuestionPage?: boolean
    errorMessage?: string
}

export default function GdsRadioButtons({ name, options, label, isQuestionPage, errorMessage }: GdsRadioButtonsProps) {
    
    const radioButtons = options.map((option, i) => (
        <div key={`${name}__${i}`} className="govuk-radios__item">
            <input className="govuk-radios__input" id={`${name}__${i}`} name={name} type="radio" value={option.value} />
            <label className="govuk-label govuk-radios__label" htmlFor={`${name}__${i}`}>
                {option.label}
            </label>
        </div>
    ))

    const legend = isQuestionPage ? (
        <legend className={`govuk-fieldset__legend govuk-fieldset__legend--xl`}>
            <h1 className="govuk-fieldset__heading">
                {label}
            </h1>
        </legend>
    ) : (
        <legend className={`govuk-fieldset__legend govuk-fieldset__legend--m`}>
            {label}
        </legend>
    )

    const error = errorMessage ? (
        <span id={`${name}__error`} className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {errorMessage}
        </span>
    ) : (
        <></>
    )
    
    return (
        <div className={`govuk-form-group${errorMessage ? ' govuk-form-group--error': ''}`}>
            <fieldset className="govuk-fieldset">
                {legend}
                {error}
                <div className="govuk-radios">
                    {radioButtons}
                </div>
            </fieldset>
        </div>
    )
}