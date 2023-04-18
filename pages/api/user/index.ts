
import { User } from '@/app/models/globalModel'
import { updateCreatedBy } from '@/app/mongoDB/post.service'
import { add, CheckAuth, getByUsername, update } from '@/app/mongoDB/user.service'
import type { NextApiRequest, NextApiResponse } from 'next'

export async function handler(
    req: NextApiRequest,
    res: NextApiResponse<User>
) {
    if (req.method === 'POST') {

        const userCred: any = req.body
        if (!userCred.username || !userCred.password || !userCred.fullname) return Promise.reject('Missing required signup information')

        const userExist = await getByUsername(userCred.username)
        if (userExist) return Promise.reject('Username already taken')
        try {

            const user = await add(userCred)
            return res.status(200).json(user)
        } catch (err) {
            console.log('err:', err)
            return res.status(500)

        }
    }

    if (req.method === 'GET') {

        try {
            const userCred: any = req.query
            if (!userCred.username || !userCred.password) return Promise.reject('Missing required login information')

            const user = await CheckAuth(userCred)
            if (!user) return Promise.reject('Invalid username or password')
            delete user.password
            return res.status(200).json(user)

        } catch (err) {
            console.log('err:', err)
            return res.status(500)
        }
    }

    if (req.method === 'PUT') {
        try {
            const user = req.body
            await update(user)
            await updateCreatedBy(user)
            return res.status(200).json(user)

        } catch (err) {
            return res.status(500)

        }
    }




    res.setHeader('Alllow', ['GET', 'POST', 'PUT'])
    res.status(425).end(`Method ${req.method} is not allowed}`)
}

export default handler