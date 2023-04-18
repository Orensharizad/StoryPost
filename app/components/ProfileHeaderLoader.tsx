import React from 'react'

function ProfileHeaderLoader() {
    return (
        <div className='flex items-center space-x-12 pb-4 '>
            <div className='w-20 h-20 md:w-36 md:h-36  rounded-full loader-animate'></div>
            <div className='flex items-center'>
                <div className='w-30 h-2 loader-animate'></div>
                <div className='flex items-center space-x-4'>
                    <div className='w-10 h-10 rounded-full loader-animate'></div>
                    <div className='w-10 h-10 rounded-full loader-animate'></div>
                    <div className='w-10 h-10 rounded-full loader-animate'></div>
                </div>
            </div>
        </div>
    )
}

export default ProfileHeaderLoader