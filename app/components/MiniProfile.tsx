import React from 'react'

function MiniProfile() {
    return (
        <div className='flex items-center justify-between mt-14 ml-10'>
            <img className='w-16 h-16 rounded-full border p-[2px] ' src="https://res.cloudinary.com/dsvs2bgn4/image/upload/v1674479066/main_aq4l31.jpg" alt="" />


            <div className='flex-1 mx-4'>
                <h2 className='font-bold'>Oren Sharizad</h2>
                <h3 className='text-sm text-gray-400'>Welcome to Instegram</h3>
            </div>
            <button className='text-blue-400 text-sm font-semibold'>Sign Out</button>
        </div>
    )
}

export default MiniProfile