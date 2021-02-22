import yup from 'yup'

export const validate = async (params, schema: yup.AnyObjectSchema) => {
    let errors = null

    try {
        await schema.validate(params, { abortEarly: false })
    } catch(e) {
        errors = e.inner?.reduce((prev, current) => ({
            ...prev,
            [current.path]: current.message,
        }), {})
    }

    return errors
}