const showErrorsToUser = (req, res, nextHandle) => nextHandle(req, res)

const handle = (req, res, nextHandle, app) => {
    const errors = req['errors']

    if(errors) {
        return showErrorsToUser(req, res, nextHandle)
    }

    const redirects = {
        'check-profession': '/check-a-regulated-profession',
        'find-a-regulatory-authority': '/find-a-regulatory-authority',
        'find-recognition-decisions' : '/find-recognition-decisions',
    }

    const whatToDo = req['body']?.['select-what-to-do']
    const redirect = redirects[whatToDo]

    if (!redirect) {
        throw new Error(`Invalid Selection => ${whatToDo}`)
    }

    return app.render(req, res, redirect)
}

export default { handle }