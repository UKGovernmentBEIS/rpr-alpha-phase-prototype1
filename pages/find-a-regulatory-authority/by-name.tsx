import Head from 'next/head'
import QuestionTemplate from '../../src/components/templates/question/question-template'
import Form from '../../src/components/form/form'
import React from 'react'
import GdsTextField from '../../src/components/gds-text-field/gds-text-field'
import GdsSelect from '../../src/components/gds-select/gds-select'
import GdsHeading1 from '../../src/components/gds-heading1/gds-heading1'
import { schema, ukCountries } from '../../src/schemas/find-a-regulatory-authority-by-name-schema'
import withValidation, { WithValidationProps } from '../../src/components/with-validation/with-validation'
import Router from 'next/router'
import useGdsScripts from '../../src/components/use-gds-scripts/use-gds-scripts'

const siteTitle = 'Regulated Professions'
const previousHref = '/find-a-regulatory-authority'
const formAction = '/find-a-regulatory-authority/by-name'

const regulatatoryAuthorityNameField = 'regulatory-authority-name'
const ukNation = 'nation'

const FindByRegulatoryAuthorityName = function(props: WithValidationProps) {
    const { errors, values, onSubmit, onChange } = props

    return (
        <QuestionTemplate previousHref={previousHref}>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <Form onSubmit={onSubmit} action={formAction} buttonLabel="Search and continue" errors={errors} >  
                <GdsHeading1>Find a regulatory authority</GdsHeading1>

                <GdsTextField 
                    label="Search for the name of the regulatory authority you are looking for" 
                    labelClassName="govuk-label" 
                    name={regulatatoryAuthorityNameField} 
                    isQuestionPage={false} 
                    errorMessage={errors[regulatatoryAuthorityNameField]}
                    value={values[regulatatoryAuthorityNameField]}
                    onChange={onChange}
                />

                <GdsSelect
                    label="Select the UK country you are looking for" 
                    labelClassName="govuk-label"
                    options={ukCountries}
                    name={ukNation} 
                    isQuestionPage={false} 
                    errorMessage={errors[ukNation]}
                    value={values[ukNation]}
                    onChange={onChange}
                />
            
            </Form>
        </QuestionTemplate>
    )
}

const onSuccessfulValidation = async (values: { [fieldName: string]: string }) => {
    await Router.push({
        pathname: '/regulatory-authority/search',
        query: {
            'regulatory-authority': values[regulatatoryAuthorityNameField],
            [ukNation]: values[ukNation]
        }
    })
}

export default withValidation(useGdsScripts(FindByRegulatoryAuthorityName), schema, onSuccessfulValidation)