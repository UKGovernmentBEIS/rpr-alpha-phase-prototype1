import { SearchDataType } from "../../types"

const showErrorsToUser = (req, res, nextHandle) => nextHandle(req, res)

const handle = async (req, res, nextHandle, dataType: SearchDataType) => {
    const errors = req['errors']

    if(errors) {
        return showErrorsToUser(req, res, nextHandle)
    }

    const professionName = req['body']?.['regulated-profession-name']
    const nation = req['body']?.['where-you-wish-to-practice']

    if(!professionName || !nation) {
        throw new Error('Invalid Search Criteria')
    }

    return res.redirect(`/profession/search?profession=${encodeURIComponent(professionName)}&where-you-wish-to-practice=${encodeURIComponent(nation)}&dataType=${encodeURIComponent(dataType)}`)
}

export const checkARegulatedProfession = {
    handle: (req, res, nextHandle) => {
        console.log('checkARegulatedProfession')
        return handle(req, res, nextHandle, 'regulated-profession')
    }
}

export const findARegulatoryAuthorityByProfession = {
    handle: (req, res, nextHandle) => {
        console.log('findARegulatoryAuthorityByProfession')
        return handle(req, res, nextHandle, 'regulatory-authority')
    }
}