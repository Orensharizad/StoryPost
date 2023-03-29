import React from 'react'
import { Suggestion } from '../models/globalModel'

type Props = {
    suggestion: Suggestion
}

function StoryPreview({ suggestion }: Props) {
    return (
        <div>
            <img className='h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out' src={suggestion.lavatar} />
            <p className='text-xs w-14 truncate text-center'>{suggestion.firstName}</p>


        </div>
    )
}

export default StoryPreview