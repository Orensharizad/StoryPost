

import { User } from '@/app/models/globalModel'
import { getById } from '@/app/mongoDB/user.service'
import type { NextApiRequest, NextApiResponse } from 'next'

export async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User>
) {
    if (req.method === 'GET') {
        const id = req.query

        try {
            const user = await getById(id)
            delete user.password
            return res.status(200).json(user)
        } catch (err) {
            return res.status(500)
        }
    }



    // res.setHeader('Alllow', ['GET', 'PUT'])
    res.status(425).end(`Method ${req.method} is not allowed}`)
}

export default handler