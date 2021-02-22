import * as yup from 'yup'

export const options = [
    {
        value: 'check-profession',
        label: 'Check requirements for a regulated profession',
    },
    {
        value: 'find-a-regulatory-authority',
        label: 'Find a regulatory authority',
    },
    {
        value: 'find-recognition-decisions',
        label: 'View annual figures regarding applications',
    }
]

export const schema = yup.object().shape({
    'select-what-to-do': yup
        .string()
        .required('Please select an option')
        .oneOf(options.map(option => option.value), 'Please select an option')
})