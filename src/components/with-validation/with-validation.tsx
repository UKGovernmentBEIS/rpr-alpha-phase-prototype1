import React, { ChangeEvent, FormEvent } from "react"
import yup from 'yup'
import { validate } from '../../validation'

export interface WithValidationProps {
    errors: { [ field: string ]: string }
    values: { [ field: string ]: string }
    onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
    onChange: (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void
}

export interface WithValidationState {
    errors: { [ field: string ]: string }
    values: { [ field: string ]: string }
}

export default function withValidation(WrappedComponent, schema: yup.AnyObjectSchema, onSuccessfulValidation?: (values: { [fieldName: string]: string }) => Promise<void>) {
    return class extends React.Component<WithValidationProps, WithValidationState> {
        constructor(props) {
            super(props)
    
            this.state = {
                errors: props.errors,
                values: props.values,
            }
        }

        static async getInitialProps(context) {
            const request = context.req;
            let errors = {}
            let values = {}

            if (request) {
                values = request['body'] || {}
                errors = request['errors'] || {}
            }
        
            return { errors, values }
        }

        private async onSubmit(event: FormEvent<HTMLFormElement>) {
            event.preventDefault()

            const fieldNames = Object.keys(schema.fields)
            const fieldValues = fieldNames.reduce((values: { [fieldName: string]: string }, fieldName: string) => {
                return {
                    ...values,
                    [fieldName]: event.target[fieldName]?.value
                }
            }, {})

            const errors = await validate(fieldValues, schema)

            if(!errors || Object.keys(errors).length == 0) {
                await onSuccessfulValidation?.(fieldValues)
            } else {
                this.setState({ errors })
            }
        }

        private onChange(event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
            this.setState({
                values: {
                    ...this.state.values,
                    [event.target.name]: event.target.value
                }
            })
        }

        render() {
            return <WrappedComponent {...this.props} errors={this.state.errors} values={this.state.values} onSubmit={this.onSubmit.bind(this)} onChange={this.onChange.bind(this)} />
        }
    }
}