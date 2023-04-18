import { Post } from "@/app/models/globalModel"
import { add, getPosts } from "@/app/mongoDB/post.service"


import type { NextApiRequest, NextApiResponse } from 'next'

export async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Post[] | Post>
) {
    if (req.method === 'GET') {

        try {
            const posts = await getPosts()
            return res.status(200).json(posts)
        } catch (err) {
            return res.status(500)
        }
    }

    if (req.method === 'POST') {
        const post = req.body
        try {
            await add(post)
            return res.status(200).json(post)
        } catch (err) {
            return res.status(500)

        }

    }

    res.setHeader('Alllow', ['GET'])
    res.status(425).end(`Method ${req.method} is not allowed}`)
}

export default handler