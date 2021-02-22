import * as yup from 'yup'
import { allUKNations } from '../types'

export const schema = yup.object().shape({
    'regulatory-authority': yup
        .string()
        .matches(/^[a-zA-Z0-9 .\'\"\-\_\?\!\(\)\[\]]{0,}$/, 'Invalid characters in search criteria')
        .required('Please enter a valid regulatory authority to search for'),
    'nation': yup
        .string()
        .required('Please select an option')
        .oneOf(allUKNations, 'Please enter a valid UK nation'),
})