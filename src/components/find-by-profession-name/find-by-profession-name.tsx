import Head from 'next/head'
import QuestionTemplate from '../../../src/components/templates/question/question-template'
import Form from '../../../src/components/form/form'
import React from 'react'
import GdsTextField from '../../../src/components/gds-text-field/gds-text-field'
import GdsSelect from '../../../src/components/gds-select/gds-select'
import GdsHeading1 from '../../../src/components/gds-heading1/gds-heading1'
import { schema, whereYouWishToPracticeOptions, countryOfQualificationOptions } from '../../../src/schemas/check-profession-schema'
import withValidation, { WithValidationProps } from '../../../src/components/with-validation/with-validation'
import Router from 'next/router'
import GdsParagraph from '../../../src/components/gds-paragraph/gds-paragraph'
import GdsLink from '../../../src/components/gds-link/gds-link'
import styles from './find-by-profession-name.module.scss'
import useGdsScripts from '../../../src/components/use-gds-scripts/use-gds-scripts'
import { SearchDataType } from '../../types'

const siteTitle = 'Regulated Professions'
const previousHref = '/select'

const regulatedProfessionNameField = 'regulated-profession-name'
const whereYouWishToPracticeField = 'where-you-wish-to-practice'
const countryOfQualificationField = 'country-of-qualification'

const whyAmIBeingAskedThis = {
    linkText: 'Why am I being asked where I gained my qualification?',
    detailsText: 'This field is optional. It is saved anonymously and only used by government bodies for analysis',
}

export default function findByProfessionName(heading: string, dataType: SearchDataType, formAction: string) {
    class FindByProfessionName extends React.Component<WithValidationProps> {
        constructor(props: WithValidationProps) {
            super(props)
        }

        render() {
            const { errors, values, onSubmit, onChange } = this.props

            return (
                <QuestionTemplate previousHref={previousHref}>
                    <Head>
                        <title>{siteTitle}</title>
                    </Head>

                    <Form onSubmit={onSubmit} action={formAction} buttonLabel="Search and continue" errors={errors} >  
                        <GdsHeading1>{heading}</GdsHeading1>

                        <GdsTextField 
                            label="Enter the profession that you are looking for" 
                            labelClassName="govuk-label" 
                            name={regulatedProfessionNameField} 
                            isQuestionPage={false} 
                            errorMessage={errors[regulatedProfessionNameField]}
                            value={values[regulatedProfessionNameField]}
                            onChange={onChange}
                        />

                        <GdsSelect
                            label="Select where you wish to practise in the UK" 
                            labelClassName="govuk-label"
                            options={whereYouWishToPracticeOptions}
                            name={whereYouWishToPracticeField} 
                            isQuestionPage={false} 
                            errorMessage={errors[whereYouWishToPracticeField]}
                            value={values[whereYouWishToPracticeField]}
                            onChange={onChange}
                        />

                        <GdsSelect 
                            label="Select the country where you gained your qualification" 
                            labelClassName="govuk-label" 
                            options={countryOfQualificationOptions}
                            name={countryOfQualificationField} 
                            isQuestionPage={false} 
                            errorMessage={errors[countryOfQualificationField]}
                            value={values[countryOfQualificationField]}
                            onChange={onChange}
                            details={whyAmIBeingAskedThis}
                        />
                    
                    </Form>

                    <GdsParagraph className={styles['beis-check-prof-search-link']}>
                        <GdsLink href="/professions">Search using our list of regulated professions</GdsLink>
                    </GdsParagraph>
                </QuestionTemplate>
            )
        }
    } 

    const onSuccessfulValidation = async (values: { [fieldName: string]: string }) => {
        await Router.push({
            pathname: '/profession/search',
            query: {
                profession: values[regulatedProfessionNameField],
                [whereYouWishToPracticeField]: values[whereYouWishToPracticeField],
                dataType,
            }
        })
    }

    return withValidation(useGdsScripts(FindByProfessionName), schema, onSuccessfulValidation)
}