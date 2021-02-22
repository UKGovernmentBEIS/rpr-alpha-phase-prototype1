import connectionOptions from './database-config'
import { ConnectionOptions, createConnection, Connection } from "typeorm"

export const connectToDatabase = async () => {
    return await createConnection(connectionOptions as ConnectionOptions)
}

export const runMigrations = async (connection) => {
    await connection.runMigrations({
        transaction: 'all'
    })
}