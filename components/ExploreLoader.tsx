import React from 'react'

function ExploreLoader() {
    return (
        <div className='  md:mt-8 col-span-6 md:col-span-5 md:max-w-[1350px] mx-auto p-3 md:p-0 '>
            <div className='w-30 h-8 rounded-md loader-animate '></div>
            <div className='grid grid-cols-3 gap-2 my-6' >
                <div className='w-80 h-80 loader-animate'></div>
                <div className='w-80 h-80 loader-animate'></div>
                <div className='w-80 h-80 loader-animate'></div>
                <div className='w-80 h-80 loader-animate'></div>
                <div className='w-80 h-80 loader-animate'></div>
                <div className='w-80 h-80 loader-animate'></div>
            </div >
        </div>

    )
}

export default ExploreLoader