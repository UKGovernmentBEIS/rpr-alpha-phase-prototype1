import * as yup from 'yup'
import { UKNation } from '../types'

export const ukCountries: {
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

export const schema = yup.object().shape({
    ['regulatory-authority-name']: yup
        .string()
        .required('Please enter the name of the regulatory authority you are looking for')
        .matches(/^[a-zA-Z0-9 .\'\"\-\_\?\!\(\)\[\]]{0,}$/, 'Invalid characters in search criteria'),
    ['nation']: yup
        .string()
        .required('Please select an option')
        .oneOf(ukCountries.map(item => item.value), 'Please select an option'),
})