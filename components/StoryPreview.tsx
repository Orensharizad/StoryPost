import React from 'react'
import { Suggestion } from '@/models/globalModel'

type Props = {
    suggestion: Suggestion
}

function StoryPreview({ suggestion }: Props) {
    return (
        <div>
            <img className='h-14 w-14 object-cover rounded-full  border-red-500 border-2 cursor-pointer hover:scale-110 transition transform duration-200 ease-out' src={suggestion.lavatar} alt='story' />
            <p className='text-xs w-14 truncate text-center'>{suggestion.firstName}</p>


        </div>
    )
}

export default StoryPreview