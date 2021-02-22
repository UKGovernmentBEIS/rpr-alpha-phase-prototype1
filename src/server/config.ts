import cfenv from 'cfenv'

export type Config = {
    host: string,
    port: number,
    url: string,
    runPendingMigrations: boolean,
}

export default (dev: boolean): Config => {
    let config: Config

    if(dev) {
        config = {
            host: process.env.HOST || 'localhost',
            port: parseInt(process.env.PORT || '3000'),
            url: `http://${process.env.HOST}:${process.env.PORT}`,
            runPendingMigrations: process.env.RUN_PENDING_MIGRATIONS === 'true' || false,
        }
    } else {
        const appEnv = cfenv.getAppEnv()

        config = {
            host: appEnv.bind,
            port: appEnv.port,
            url: appEnv.url,
            runPendingMigrations: process.env.RUN_PENDING_MIGRATIONS === 'true' || false,
        }
    }
    return config
}