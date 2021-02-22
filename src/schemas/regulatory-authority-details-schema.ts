import * as yup from 'yup'

export const schema = yup.object().shape({
    'regulatoryAuthorityName': yup
        .string()
        .matches(/^[a-zA-Z0-9 .\'\"\-\_\?\!\(\)\[\]]{0,}$/, 'Invalid characters in search criteria')
        .required('Please enter a valid regulatory authority to search for')
})