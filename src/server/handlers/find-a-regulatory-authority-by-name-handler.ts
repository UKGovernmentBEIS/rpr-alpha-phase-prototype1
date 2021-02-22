const showErrorsToUser = (req, res, nextHandle) => nextHandle(req, res)

const handle = async (req, res, nextHandle) => {
    const errors = req['errors']

    if(errors) {
        return showErrorsToUser(req, res, nextHandle)
    }

    const regulatoryAuthorityName = req['body']?.['regulatory-authority-name']
    const nation = req['body']?.['nation']

    if(!regulatoryAuthorityName || !nation) {
        throw new Error('Invalid Search Criteria')
    }

    return res.redirect(`/regulatory-authority/search?regulatory-authority=${encodeURIComponent(regulatoryAuthorityName)}&nation=${encodeURIComponent(nation)}`)
}

export default { handle }