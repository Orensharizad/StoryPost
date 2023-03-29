'use client'
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import { Suggestion } from '../models/globalModel';
import StoryPreview from './StoryPreview';


function StoryList() {

    const [suggestion, setSuggestion] = useState<Suggestion[]>([])

    useEffect(() => {
        loadSuggestion()

    }, [])

    const loadSuggestion = () => {
        const suggestion = [...Array(20)].map((_, i) => ({
            _id: faker.datatype.uuid(),
            sex: faker.name.sexType(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            lavatar: faker.image.avatar(),
        }))

        setSuggestion(suggestion)
    }


    return (
        <div className='flex space-x-2 p-6 bg-white mt-8 border border-gray-200 rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black '>
            {suggestion.map((suggestion: Suggestion) =>
                <StoryPreview key={suggestion._id} suggestion={suggestion} />

            )}


        </div>
    )
}

export default StoryList