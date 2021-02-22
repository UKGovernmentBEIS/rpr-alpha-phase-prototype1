import Head from 'next/head'
import GdsRadioButtons from '../../src/components/gds-radio-buttons/gds-radio-buttons'
import QuestionTemplate from '../../src/components/templates/question/question-template'
import Form from '../../src/components/form/form'
import React from 'react'
import Router from 'next/router'
import { schema, options } from '../../src/schemas/find-a-regulatory-authority-schema'
import withValidation, { WithValidationProps } from '../../src/components/with-validation/with-validation'
import GdsDetails from '../../src/components/gds-details/gds-details'

const siteTitle = 'Regulated Professions'
const question = 'Find a regulatory authority'
const previousHref = '/select'
const selectionName = 'selected-method'
const formAction = '/find-a-regulatory-authority'
const redirects = {
    'by-name': '/find-a-regulatory-authority/by-name',
    'by-profession': '/find-a-regulatory-authority/by-profession',
}
const whatIsARegulatoryAuthority = "When a professional wants to practise their regulated profession in a UK nation, they need to apply to the relevant regulatory authority. Regulatory authorities are responsible for taking a decision on whether a professional has the right to practise in their nation."

const FindARegulatoryAuthority = function(props: WithValidationProps) {
    const { errors, onSubmit } = props

    return (
        <QuestionTemplate previousHref={previousHref}>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <Form onSubmit={onSubmit} action={formAction} buttonLabel="Continue" errors={errors} >
                <GdsRadioButtons label={question} name={selectionName} options={options} isQuestionPage={true} errorMessage={errors?.[selectionName]} />
            </Form>

            <GdsDetails linkText="What is a regulatory authority" detailsText={whatIsARegulatoryAuthority} />
        </QuestionTemplate>
    )
}

const onSuccessfulValidation = async (values: { [fieldName: string]: string }) => {
    await Router.push(redirects[values[selectionName]])
}

export default withValidation(FindARegulatoryAuthority, schema, onSuccessfulValidation)