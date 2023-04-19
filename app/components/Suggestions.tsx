'use client'
import { faker } from '@faker-js/faker'
import React, { useEffect, useState } from 'react'
import { Suggestion, User } from '../models/globalModel'
import { userService } from '@/services/userService'
import Link from 'next/link'
import SuggestionsLoader from './SuggestionsLoader'
import { useAppSelector } from '@/hooks/stateHook'

function Suggestions() {

    const [suggestion, setSuggestion] = useState<Suggestion[]>([])
    const [users, setUsers] = useState<User[]>([])
    const { user: loggdinUser } = useAppSelector((state) => state.user)


    useEffect(() => {
        loadSuggestion()
        loadUsers()

    }, [])

    const loadSuggestion = () => {
        const suggestion = [...Array(5)].map((_, i) => ({
            _id: faker.datatype.uuid(),
            sex: faker.name.sexType(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            lavatar: faker.image.avatar(),
            company: faker.company.name()
        }))

        setSuggestion(suggestion)
    }

    const loadUsers = async () => {
        try {
            const users = await userService.getUsers()
            const usersWithOutLoggindUser = users.filter((user: User) => user._id !== loggdinUser?._id)
            setUsers(usersWithOutLoggindUser.slice(0, 5))
        } catch (err) {
            console.log('err:', err)
        }
    }

    if (!users.length) return <SuggestionsLoader />
    return (
        <section className='mt-4 ml-10 '>
            <div className='flex justify-between text-sm mb-5'>
                <h3 className='text-sm font-bold text-gray-400'>Suggestions for ypu</h3>
                <button className='text-gray-600 font-semibold'>See All</button>
            </div>

            {users.map((user: User) =>
                <div key={user._id} className='flex items-center justify-between mt-3 '>
                    <img className='w-10 h-10 rounded-full border p-[2px]' src={user.userImg} alt="" />
                    <div className='flex-1 ml-4'>
                        <h2 className='font-semibold text-sm '>{user.fullname}</h2>

                    </div>
                    <Link href={`/profile/${user._id}`} className='text-blue-400 text-xs font-semibold'>View</Link>

                </div>

            )}

        </section>
    )
}

export default Suggestions