import yup from 'yup'
import { validate } from '../../validation'

const validateRequest = async (requestObject: any, schema: yup.AnyObjectSchema, failOnBadRequest: boolean, req, res, next) => {
    const errors = await validate(requestObject, schema)

    if(failOnBadRequest && Object.keys(errors).length > 0) {
        res.status(400).send('Bad Request')
        return
    }

    req['errors'] = errors

    next()
}

export const validateBody = (schema: yup.AnyObjectSchema, failOnBadRequest: boolean = false) => async (req, res, next) => {
    return await validateRequest(req['body'], schema, failOnBadRequest, req, res, next)
}

export const validateQuery = (schema: yup.AnyObjectSchema, failOnBadRequest: boolean = false) => async (req, res, next) => {
    return await validateRequest(req['query'], schema, failOnBadRequest, req, res, next)
}

export const validateParams = (schema: yup.AnyObjectSchema, failOnBadRequest: boolean = false) => async (req, res, next) => {
    return await validateRequest(req['params'], schema, failOnBadRequest, req, res, next)
}