import { FormEvent } from 'react'
import GdsButton from '../gds-button/gds-button'
import GdsErrorSummary from '../gds-error-summary/gds-error-summary'

export type FormProps = {
    action: string
    buttonLabel: string
    children: any
    errors?: { [fieldName: string]: string }
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void
}

export default function Form({ action, children, buttonLabel, errors, onSubmit }: FormProps) {
    return (
        <>
            <GdsErrorSummary errors={errors} />
            <form onSubmit={onSubmit} action={action} method="post" noValidate>
                {children}
                <GdsButton>{buttonLabel}</GdsButton>
            </form>
        </>
    )
}