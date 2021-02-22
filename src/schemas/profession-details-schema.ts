import * as yup from 'yup'
import { allUKNations } from '../types'

export const schema = yup.object().shape({
    'professionName': yup
        .string()
        .matches(/^[a-zA-Z0-9 .\'\"\-\_\?\!\(\)\[\]]{0,}$/, 'Invalid characters in search criteria')
        .required('Please enter a valid profession to search for'),
    'professionNameOrNation': yup
        .string()
        .required('Please select an option')
        .oneOf(allUKNations, 'Please enter a valid choice for where you wish to practise'),
})