
import { ObjectId } from "mongodb";
import { User } from "../models/globalModel";
import { getCollection } from "./index";


export async function getUsers() {
    try {
        const collection = await getCollection('user')

        const users = await collection.find({}).toArray()

        return users
    } catch (err) {
        console.error('cannot find users', err)
        throw err
    }

}

export async function getById(userId: any) {
    try {
        const collection = await getCollection('user')
        const user = collection.findOne({ _id: new ObjectId(userId) })
        return user
    } catch (err) {
        console.error(`while finding user ${userId}`, err)
        throw err
    }
}


export async function update(user: User) {
    const currUser = await getById(user._id)
    try {
        const userToSave = {
            ...currUser,
            fullname: user.fullname,
            userImg: user.userImg
        }
        const collection = await getCollection('user')
        await collection.updateOne({ _id: new ObjectId(user._id) }, { $set: userToSave })
        return userToSave
    } catch (err) {
        console.error(`cannot update userfrom mongoService `, err)
        throw err
    }
}


export async function add(user: User) {
    try {
        const collection = await getCollection('user')
        await collection.insertOne(user)
        return user
    } catch (err) {
        console.error('cannot insert user', err)
        throw err
    }
}

export async function remove(userId: any) {
    try {
        const collection = await getCollection('user')
        await collection.deleteOne({ _id: new ObjectId(userId) })
        return userId
    } catch (err) {
        console.error(`cannot remove user`, err)
        throw err
    }
}


export async function CheckAuth(userCred: User) {
    try {
        const collection = await getCollection('user')
        const username = userCred.username
        const user: User = await collection.findOne({ username })
        if (!user) return false
        const auth = user.password === userCred.password
        return auth ? user : false
    } catch (err) {
        console.error(`cannot find user`)
        throw err
    }
}

export async function getByUsername(username: string) {
    try {
        const collection = await getCollection('user')
        const user = await collection.findOne({ username })
        return user ? true : false
    } catch (err) {
        console.log('err from mongo service:', err)
        throw err
    }
}







