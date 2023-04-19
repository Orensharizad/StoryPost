import React from 'react'

function PostLoader() {


    const loader = [
        { loader: '' },
        { loader: '' },
        { loader: '' },
        { loader: '' },
    ]





    return (
        <>
            {loader.map((loader: any, idx) =>
                <div key={idx} className='flex flex-col space-y-2 md:max-w-[80%] mx-auto mb-16'>
                    {/* header */}
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-4'>
                            <div className='rounded-full h-8 w-8  border mr-3 loader-animate'></div>
                            <div className='w-10 h-2 loader-animate'></div>
                        </div>
                        <div className='w-10 h-2 loader-animate' ></div>
                    </div>
                    {/* img */}
                    <div className='h-[515px] w-[536px] loader-animate'></div>
                    {/* icons */}
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-3 '>
                            <div className='h-7 w-7 rounded-full loader-animate'></div>
                            <div className='h-7 w-7 rounded-full loader-animate'></div>
                            <div className='h-7 w-7 rounded-full loader-animate'></div>
                        </div>
                        <div className='h-7 w-7 rounded-full loader-animate'></div>

                    </div>

                </div>
            )
            }
        </>
    )
}

export default PostLoader