import { ChangeEvent } from 'react'
import GdsDetails, { GdsDetailsProps } from '../gds-details/gds-details'
import styles from './gds-select.module.scss'

export type SelectOption = {
    value: string
    label: string
}

export type GdsSelectProps = {
    name: string
    label: string
    value?: string
    options: SelectOption[]
    isQuestionPage?: boolean
    errorMessage?: string
    labelClassName?: string
    onChange?: (event: ChangeEvent<HTMLUnknownElement>) => void
    details?: GdsDetailsProps
}

export default function GdsSelect({ name, label, options, value, onChange, isQuestionPage, labelClassName, errorMessage, details }: GdsSelectProps) {

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

    const selectOptions = options.map((option, i) => <option key={`${name}__option__${i}`} value={option.value}>{option.label}</option>)
    
    return (
        <div className={`govuk-form-group${errorMessage ? ' govuk-form-group--error': ''}`}>
            {labelElement}
            {error}
            <select onChange={onChange} className={`${styles['govuk-select--width-20']} govuk-select`} value={value} id={name} name={name}>
                {selectOptions}
            </select>
            { details ? <div className={styles['govuk-select__details']}><GdsDetails {...details} /></div> : <></> }
        </div>
    )
}