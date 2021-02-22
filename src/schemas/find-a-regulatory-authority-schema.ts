import * as yup from 'yup'

export const options = [
    {
        value: 'by-name',
        label: 'By name or the regulatory authority',
    },
    {
        value: 'by-profession',
        label: 'By profession',
    },
]

export const schema = yup.object().shape({
    'selected-method': yup
        .string()
        .required('Please select an option')
        .oneOf(options.map(option => option.value), 'Please select an option')
})