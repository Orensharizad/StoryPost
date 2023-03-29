'use client'
import { faker } from '@faker-js/faker';
import { useEffect, useState } from 'react';
import { Suggestion } from '../models/globalModel';
import StoryPreview from './StoryPreview';


function StoryList() {

    const [suggestion, setSuggestion] = useState<Suggestion[]>([])

    useEffect(() => {
        const suggestion = [...Array(20)].map((_, i) => ({
            _id: faker.datatype.uuid(),
            sex: faker.name.sexType(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            lavatar: faker.image.avatar(),
        }))

        setSuggestion(suggestion)

    }, [])


    return (
        <div>
            {suggestion.map((suggestion: Suggestion) =>
                <StoryPreview key={suggestion._id} suggestion={suggestion} />

            )}


        </div>
    )
}

export default StoryList