import Head from 'next/head'
import GdsRadioButtons from '../src/components/gds-radio-buttons/gds-radio-buttons'
import QuestionTemplate from '../src/components/templates/question/question-template'
import Form from '../src/components/form/form'
import React from 'react'
import Router from 'next/router'
import { schema, options } from '../src/schemas/select-schema'
import withValidation, { WithValidationProps } from '../src/components/with-validation/with-validation'
import useGdsScripts from '../src/components/use-gds-scripts/use-gds-scripts'

const siteTitle = 'Regulated Professions'
const question = 'Select what you want to do'
const previousHref = '/'
const selectionName = 'select-what-to-do'
const formAction = '/select'
const redirects = {
    'check-profession': '/check-a-regulated-profession',
    'find-a-regulatory-authority': '/find-a-regulatory-authority',
    'find-recognition-decisions' : '/find-recognition-decisions',
}

const Select = function(props: WithValidationProps) {
    const { errors, onSubmit } = props

    return (
        <QuestionTemplate previousHref={previousHref}>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <Form onSubmit={onSubmit} action={formAction} buttonLabel="Continue" errors={errors} >
                <GdsRadioButtons label={question} name={selectionName} options={options} isQuestionPage={true} errorMessage={errors?.[selectionName]} />
            </Form>
        </QuestionTemplate>
    )
}

const onSuccessfulValidation = async (values: { [fieldName: string]: string }) => {
    await Router.push(redirects[values[selectionName]])
}

export default withValidation(useGdsScripts(Select), schema, onSuccessfulValidation)