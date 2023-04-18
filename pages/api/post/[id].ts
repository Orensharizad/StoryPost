import { Post } from "@/app/models/globalModel"
import { getById, update } from "@/app/mongoDB/post.service"


import type { NextApiRequest, NextApiResponse } from 'next'

export async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === 'GET') {
        const id = req.body

        try {
            const post = await getById(id)
            return res.status(200).json(post)
        } catch (err) {
            return res.status(500)
        }
    }

    if (req.method === 'PUT') {
        try {
            const post = req.body
            await update(post)
            return res.status(200).json(post)

        } catch (err) {
            console.error('Failed to update post', err)
            res.status(500).send({ err: 'Failed to update post' })
        }
    }

    // res.setHeader('Alllow', ['GET', 'PUT'])
    res.status(425).end(`Method ${req.method} is not allowed}`)
}

export default handler