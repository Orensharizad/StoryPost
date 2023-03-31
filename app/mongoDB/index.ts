import { MongoClient } from 'mongodb'

var dbConn: any = null

export async function getCollection(collectionName: string) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        console.error('Failed to get Mongo collection', err)
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    const URI: any = process.env.MONGODB_URI
    try {
        const client = await MongoClient.connect(URI, { monitorCommands: true })
        const db = client.db(process.env.DB_NAME)
        dbConn = db
        return db
    } catch (err) {
        console.error('Cannot Connect to DB', err)
        throw err
    }
}




