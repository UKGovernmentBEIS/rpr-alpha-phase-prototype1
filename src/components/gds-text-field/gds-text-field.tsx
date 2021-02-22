import { ChangeEvent } from "react"

export type GdsTextFieldProps = {
    name: string
    label: string
    value?: string
    isQuestionPage?: boolean
    errorMessage?: string
    labelClassName?: string
    onChange?: (event: ChangeEvent<HTMLUnknownElement>) => void
}

export default function GdsTextField({ name, label, value, onChange, isQuestionPage, labelClassName, errorMessage }: GdsTextFieldProps) {

    const labelElement = isQuestionPage ? (
        <h1 className="govuk-label-wrapper">
            <label className={labelClassName || "govuk-label govuk-label--l"} htmlFor={name}>
                {label}
            </label>
        </h1>
    ) : (
        <label className={labelClassName || "govuk-label govuk-label--m"} htmlFor={name}>
            {label}
        </label>
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
            {labelElement}
            {error}
            <div className="govuk-radios">
                <input onChange={onChange} value={value} className="govuk-input govuk-input--width-20" id={name} name={name} type="text" />
            </div>
        </div>
    )
}