
import { ObjectId } from "mongodb";
import { getCollection } from "./index";
import { Comment, CreatedBy, Like, Post, User } from "@/models/globalModel";


export async function getPosts() {
    try {
        const collection = await getCollection('post')
        const posts = await collection.find({}).sort({ _id: -1 }).toArray()
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
        const postToUpdate = JSON.parse(JSON.stringify((post)))
        delete postToUpdate._id  //need to change this
        const collection = await getCollection('post')
        await collection.updateOne({ _id: new ObjectId(post._id) }, { $set: postToUpdate })
        return post
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


export async function updateCreatedBy(user: User) {
    const createdBy: CreatedBy = {
        userId: user._id,
        fullname: user.fullname,
        userImg: user.userImg
    }
    try {

        const posts = await getPosts()
        posts.forEach(async (post: Post) => {
            const comments = post.comments.map((comment: Comment) => {
                if (comment.createdBy.userId === user._id) {
                    return { ...comment, createdBy }
                }
                else return comment
            })

            const likes = post.likes.map((like: Like) => {
                if (like.createdBy.userId === user._id) {
                    return { ...like, createdBy }
                }
                else return like
            })
            const newCreatedBy = post.createdBy.userId === user._id ? createdBy : post.createdBy

            const newPost = { ...post, likes, comments, createdBy: newCreatedBy }
            await update(newPost)

        });


    } catch (err) {
        console.log('err: cannot updated Post', err)
    }

}






