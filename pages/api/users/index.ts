
import { User } from '@/models/globalModel'
import { getUsers } from '@/mongoDB/user.service'
import type { NextApiRequest, NextApiResponse } from 'next'

export async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User>
) {
    if (req.method === 'GET') {

        try {
            const users = await getUsers()
            const cleanUsers = users.map((user: User) => {
                delete user.password
                return user
            })

            return res.status(200).json(cleanUsers)

        } catch (err) {
            console.log('err:', err)
            return res.status(500)
        }
    }





    res.setHeader('Alllow', ['GET', 'POST', 'PUT'])
    res.status(425).end(`Method ${req.method} is not allowed}`)
}

export default handler