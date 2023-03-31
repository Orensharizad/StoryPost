
import { ObjectId } from "mongodb";
import { Post } from "../models/globalModel";
import { getCollection } from "./index";


export async function getPosts() {
    try {
        const collection = await getCollection('post')

        const posts = await collection.find({}).toArray()

        return posts
    } catch (err) {
        console.error('cannot find posts', err)
        throw err
    }

}

export async function getById(postId: any) {
    try {
        const collection = await getCollection('post')
        const post = collection.findOne({ _id: new ObjectId(postId) })
        return post
    } catch (err) {
        console.error(`while finding post ${postId}`, err)
        throw err
    }
}


export async function update(post: Post) {
    try {
        const postToSave = {
            ...post
        }
        const collection = await getCollection('post')
        await collection.updateOne({ _id: new ObjectId(post._id) }, { $set: postToSave })
        return postToSave
    } catch (err) {
        console.error(`cannot update post from mongoService `, err)
        throw err
    }
}


export async function add(post: Post) {
    try {
        const collection = await getCollection('post')
        await collection.insertOne(post)
        return post
    } catch (err) {
        console.error('cannot insert post', err)
        throw err
    }
}

export async function remove(postId: any) {
    try {
        const collection = await getCollection('post')
        await collection.deleteOne({ _id: new ObjectId(postId) })
        return postId
    } catch (err) {
        console.error(`cannot remove post `, err)
        throw err
    }
}







