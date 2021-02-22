import dotenv from 'dotenv'
import path from 'path'
import cfenv from 'cfenv'

dotenv.config()

const connectionOptions = {
    type: 'postgres',
    synchronize: false,
    logging: false,
    entities: [
        path.join(__dirname, 'model/entities/*.{ts,js}'),
    ],
    migrations: [
        path.join(__dirname, 'model/migrations/*.{ts,js}'),
    ],
    cli: {
        migrationsDir: 'src/server/model/migrations',
    },
}

const dbServiceName = process.env.DB_SERVICE_NAME

if(process.env.NODE_ENV === 'production' && dbServiceName) {
    const vcapServices = cfenv.getAppEnv().getServices()
    const dbConnection = vcapServices[dbServiceName]

    if(!dbConnection) {
        throw new Error('Unable to find bound database service => please confirm the backing service is bound to the application')
    }

    const { username, password, name, host, port } = dbConnection.credentials

    const connectionString = `postgresql://${username}:${password}@${host}:${port}/${name}?sslmode=verify-full`

    Object.assign(connectionOptions, {
        url: connectionString,
    })
} else if (process.env.TYPEORM_URL) {
    Object.assign(connectionOptions, {
        url: process.env.TYPEORM_URL,
    })
} else {
    Object.assign(connectionOptions, {
        host: process.env.TYPEORM_HOST,
        port: process.env.TYPEORM_PORT,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
    })
}

export default connectionOptions