import * as yup from 'yup'
import { allUKNations } from '../types'

export const dataTypes = [
    'regulated-profession',
    'regulatory-authority',
]

export const schema = yup.object().shape({
    'profession': yup
        .string()
        .matches(/^[a-zA-Z0-9 .\'\"\-\_\?\!\(\)\[\]]{0,}$/, 'Invalid characters in search criteria')
        .required('Please enter a valid profession to search for'),
    'where-you-wish-to-practice': yup
        .string()
        .required('Please select an option')
        .oneOf(allUKNations, 'Please enter a valid choice for where you wish to practise'),
    'dataType': yup
        .string()
        .required('Please enter a valid data type to search for')
        .oneOf(dataTypes, 'Please enter a valid data type to search for'),
})