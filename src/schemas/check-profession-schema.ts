import * as yup from 'yup'
import { UKNation } from '../types'

export const whereYouWishToPracticeOptions: {
    label: string
    value: UKNation
}[] = [
    {
        label: 'Anywhere in the United Kingdom',
        value: 'all'
    },
    {
        label: 'England',
        value: 'england'
    },
    {
        label: 'Scotland',
        value: 'scotland'
    },
    {
        label: 'Wales',
        value: 'wales'
    },
    {
        label: 'Northern Ireland',
        value: 'northern ireland'
    },
]

export const countryOfQualificationOptions = [
    {
        label: 'Select',
        value: 'none'
    },
    {
        label: 'Greece',
        value: 'greece'
    },
    {
        label: 'France',
        value: 'france'
    },
    {
        label: 'Germany',
        value: 'germany'
    },
    {
        label: 'United States of America',
        value: 'united-states-of-america'
    },
]

export const schema = yup.object().shape({
    ['regulated-profession-name']: yup
        .string()
        .required('Please enter the name of the regulated profession you are looking for')
        .matches(/^[a-zA-Z0-9 .\'\"\-\_\?\!\(\)\[\]]{0,}$/, 'Invalid characters in search criteria'),
    ['where-you-wish-to-practice']: yup
        .string()
        .required('Please select an option')
        .oneOf(whereYouWishToPracticeOptions.map(item => item.value), 'Please select an option'),
    ['country-of-qualification']: yup
        .string()
        .optional()
        .oneOf(countryOfQualificationOptions.map(item => item.value), 'Please select a country'),
})