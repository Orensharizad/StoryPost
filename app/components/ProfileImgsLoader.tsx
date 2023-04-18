import React from 'react'

function ProfileImgsLoader() {
    return (
        <div className='grid grid-cols-3 gap-1 my-6'>
            {/* <div className='flex  flex-wrap gap-2 md:max-w-6xl mx-auto '> */}
            <div className='w-32 h-32 md:w-72 md:h-72  loader-animate'></div>
            <div className='w-32 h-32 md:w-72 md:h-72  loader-animate'></div>
            <div className='w-32 h-32 md:w-72 md:h-72  loader-animate'></div>
            <div className='w-32 h-32 md:w-72 md:h-72  loader-animate'></div>
            <div className='w-32 h-32 md:w-72 md:h-72  loader-animate'></div>
            <div className='w-32 h-32 md:w-72 md:h-72  loader-animate'></div>

        </div>
    )
}

export default ProfileImgsLoader