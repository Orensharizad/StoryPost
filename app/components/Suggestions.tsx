'use client'
import { faker } from '@faker-js/faker'
import React, { useEffect, useState } from 'react'
import { Suggestion } from '../models/globalModel'

function Suggestions() {

    const [suggestion, setSuggestion] = useState<Suggestion[]>([])

    useEffect(() => {
        loadSuggestion()

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


    return (
        <section className='mt-4 ml-10 '>
            <div className='flex justify-between text-sm mb-5'>
                <h3 className='text-sm font-bold text-gray-400'>Suggestions for ypu</h3>
                <button className='text-gray-600 font-semibold'>See All</button>
            </div>

            {suggestion.map((suggestion: Suggestion) =>
                <div key={suggestion._id} className='flex items-center justify-between mt-3 '>
                    <img className='w-10 h-10 rounded-full border p-[2px]' src={suggestion.lavatar} alt="" />
                    <div className='flex-1 ml-4'>
                        <h2 className='font-semibold text-sm '>{suggestion.firstName}</h2>
                        <h3 className='text-xs text-gray-400'>Works at {suggestion.company}</h3>

                    </div>
                    <button className='text-blue-400 text-xs font-semibold'>Follow</button>

                </div>

            )}

        </section>
    )
}

export default Suggestions