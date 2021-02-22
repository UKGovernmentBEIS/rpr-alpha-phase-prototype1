import 'reflect-metadata'
import express from 'express'
import next from 'next'
import select from './handlers/select-handler'
import findARegulatoryAuthority from './handlers/find-a-regulatory-authority-handler'
import { checkARegulatedProfession, findARegulatoryAuthorityByProfession } from './handlers/find-by-profession-name-handler'
import findARegulatoryAuthorityByName from './handlers/find-a-regulatory-authority-by-name-handler'
import { validateBody, validateParams, validateQuery } from './middleware/validation-middleware'
import { schema as checkProfessionSchema } from '../schemas/check-profession-schema'
import { schema as regulatedProfessionSearchSchema } from '../schemas/search-regulated-profession-schema'
import { schema as regulatoryAuthoritySearchSchema } from '../schemas/search-regulatory-authority-schema'
import { schema as selectSchema } from '../schemas/select-schema'
import { schema as selectByNationSchema } from '../schemas/select-by-nation-schema'
import { schema as professionDetailsSchema } from '../schemas/profession-details-schema'
import { schema as findARegulatoryAuthoritySchema } from '../schemas/find-a-regulatory-authority-schema'
import { schema as findARegulatoryAuthorityByNameSchema } from '../schemas/find-a-regulatory-authority-by-name-schema'
import { schema as regulatoryAuthorityDetailsSchema } from '../schemas/regulatory-authority-details-schema'
import { connectToDatabase, runMigrations } from './database'
import config from './config'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const _config = config(dev)

const wrapHandler = (handler, nextHandle, app) => async (req, resp, next) =>{
    try {
        return await handler(req, resp, nextHandle, app)
    } catch(err) {
        return next(err)
    }
}

app
.prepare()
.then(() => {
    return connectToDatabase()
})
.then((connection) => {
    if(_config.runPendingMigrations) {
        return runMigrations(connection)
    }
})
.then(() => {
    const server = express()

    server.get('/profession/search', 
        validateQuery(regulatedProfessionSearchSchema),
        (req, res) => {
            return handle(req, res)
        }
    )

    server.get('/profession/:professionNameOrNation/:professionName', 
        validateParams(professionDetailsSchema),
        (req, res) => {
            return handle(req, res)
        }
    )

    server.get('/profession/:professionNameOrNation', 
        validateParams(selectByNationSchema),
        (req, res) => {
            return handle(req, res)
        }
    )

    server.get('/regulatory-authority/search', 
        validateQuery(regulatoryAuthoritySearchSchema),
        (req, res) => {
            return handle(req, res)
        }
    )

    server.get('/regulatory-authority/:regulatoryAuthorityName', 
        validateParams(regulatoryAuthorityDetailsSchema),
        (req, res) => {
            return handle(req, res)
        }
    )
    
    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.post('/select', 
        express.urlencoded(), 
        validateBody(selectSchema),
        wrapHandler(select.handle, handle, app),
    )

    server.post('/check-a-regulated-profession', 
        express.urlencoded(), 
        validateBody(checkProfessionSchema),
        wrapHandler(checkARegulatedProfession.handle, handle, app),
    )

    server.post('/find-a-regulatory-authority/by-profession', 
        express.urlencoded(), 
        validateBody(checkProfessionSchema),
        wrapHandler(findARegulatoryAuthorityByProfession.handle, handle, app),
    )

    server.post('/find-a-regulatory-authority', 
        express.urlencoded(), 
        validateBody(findARegulatoryAuthoritySchema),
        wrapHandler(findARegulatoryAuthority.handle, handle, app),
    )

    server.post('/find-a-regulatory-authority/by-name', 
        express.urlencoded(), 
        validateBody(findARegulatoryAuthorityByNameSchema),
        wrapHandler(findARegulatoryAuthorityByName.handle, handle, app),
    )
    //TODO: error handler

    server.use(function (err, req, res, next) {
        console.error(err.stack)
        res.status(500).send('Something broke!')
    })

    server.listen(_config.port, _config.host, (err) => {
        if (err) throw err
        console.log(`> Ready on ${_config.url}`)
    })
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})