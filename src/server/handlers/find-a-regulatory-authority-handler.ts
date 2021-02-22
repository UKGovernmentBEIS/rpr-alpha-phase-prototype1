const showErrorsToUser = (req, res, nextHandle) => nextHandle(req, res)

const handle = (req, res, nextHandle, app) => {
    const errors = req['errors']

    if(errors) {
        return showErrorsToUser(req, res, nextHandle)
    }

    const redirects = {
        'by-name': '/find-a-regulatory-authority/by-name',
        'by-profession': '/find-a-regulatory-authority/by-profession',
    }

    const selectedMethod = req['body']?.['selected-method']
    const redirect = redirects[selectedMethod]

    if (!redirect) {
        throw new Error(`Invalid Selection => ${selectedMethod}`)
    }

    return app.render(req, res, redirect)
}

export default { handle }