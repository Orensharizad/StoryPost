import React from 'react'

function StoryLoader() {
    return (
        <div className='flex space-x-2 pl-1 bg-white mt-8  overflow-x-hidden scroll-smooth  mb-4 '>
            <div className=' h-14 w-14 rounded-full loader-animate' />
            <div className=' h-14 w-14 rounded-full loader-animate' />
            <div className=' h-14 w-14 rounded-full loader-animate' />
            <div className=' h-14 w-14 rounded-full loader-animate' />
            <div className=' h-14 w-14 rounded-full loader-animate' />
            <div className=' h-14 w-14 rounded-full loader-animate' />
            <div className=' h-14 w-14 rounded-full loader-animate hidden md:inline-flex' />
            <div className=' h-14 w-14 rounded-full loader-animate hidden md:inline-flex' />
            <div className=' h-14 w-14 rounded-full loader-animate hidden md:inline-flex' />
        </div>
    )
}

export default StoryLoader