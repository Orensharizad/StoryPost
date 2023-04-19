'use client'
import { faker } from '@faker-js/faker';
import { useEffect, useRef, useState } from 'react';
import { Suggestion } from '@/models/globalModel';
import StoryPreview from './StoryPreview';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import StoryLoader from './StoryLoader';



function StoryList() {

    const [suggestion, setSuggestion] = useState<Suggestion[]>([])
    const [isFullyScrolledRight, setIsFullyScrolledRight] = useState<boolean>(false)
    const [isFullyScrolledLeft, setIsFullyScrolledLeft] = useState<boolean>(true)
    const scrollRef = useRef<HTMLInputElement>(null)


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

    const onScrollFilters = (direction: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft += 380 * direction
            setTimeout(() => {
                calcIsFullyScrolled()
            }, 600)
        }
    }

    const calcIsFullyScrolled = () => {
        if (scrollRef.current) {
            setIsFullyScrolledRight(
                Math.round(scrollRef.current?.scrollLeft) ===
                Math.round(scrollRef.current?.scrollWidth - scrollRef.current?.clientWidth)
            )
            setIsFullyScrolledLeft(scrollRef.current?.scrollLeft === 0)
        }
    }

    if (!suggestion.length) return <StoryLoader />

    return (
        <section className='relative'>
            {!isFullyScrolledLeft && <div onClick={() => onScrollFilters(-1)} className='hidden sm:inline-flex absolute left-4 bg-white rounded-full top-4  z-10 p-[3px] cursor-pointer shadow-2xl  items-center justify-center'>
                <ChevronLeftIcon className='w-5 h-5  ' />
            </div>}

            <div ref={scrollRef} className='flex space-x-2 pl-1 bg-white mt-8  overflow-x-hidden scroll-smooth  mb-4 '>
                {suggestion.map((suggestion: Suggestion) =>
                    <StoryPreview key={suggestion._id} suggestion={suggestion} />

                )}
            </div >
            {!isFullyScrolledRight && <div onClick={() => onScrollFilters(1)} className='hidden sm:inline-flex absolute right-2 bg-white rounded-full top-4  z-10 p-[3px] cursor-pointer shadow-2xl items-center justify-center'>
                <ChevronRightIcon className='w-5 h-5 ' />

            </div>}
        </section>
    )
}

export default StoryList