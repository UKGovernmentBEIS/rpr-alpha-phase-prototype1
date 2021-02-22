import { AnyObjectSchema } from "yup"
import { ProfessionSearchResult } from "./types"
import { validate } from "./validation"

export const getExistingValidationErrors = (context) => {
    let errors = context.req?.['errors']

    if(!errors || Object.keys(errors).length === 0) {
        errors = null
    }

    return errors
}

export const validateQuery = async (query, schema: AnyObjectSchema) => {
    let errors = await validate(query, schema)

    if(!errors || Object.keys(errors).length === 0) {
        errors = null
    }

    return errors
}

export const getLinkForProfessionName = (professionName: string, nation?:string) => {
    if(nation) {
        return `/profession/${encodeURIComponent(nation).toLowerCase()}/${encodeURIComponent(professionName).toLowerCase()}`
    } else {
        return `/profession/${encodeURIComponent(professionName).toLowerCase()}`
    }
}

export const getLinkForRegulatoryAuthorityName = (regulatoryAuthorityName: string) => `/regulatory-authority/${encodeURIComponent(regulatoryAuthorityName.toLowerCase())}`

export const getLinkForSearchResult = (result: ProfessionSearchResult, dataType?: string) => {
    if(dataType === 'regulatory-authority') {
        return getLinkForRegulatoryAuthorityName(result.regulatoryAuthorityName)
    } else if(result.nations.length === 1) {
        return getLinkForProfessionName(result.name, result.nations[0])
    } else {
        return getLinkForProfessionName(result.name)
    }
}

export const booleanToDisplayString = (value: boolean) => value ? "Yes" : "No"