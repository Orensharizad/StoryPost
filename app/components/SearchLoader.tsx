import React from 'react'

type Props = {}

function SearchLoader({ }: Props) {

    const loader = [
        { loader: '' },
        { loader: '' },
        { loader: '' },
        { loader: '' },
    ]
    return (
        <>
            {loader.map((loader: any, idx) =>
                <div key={idx} className="flex items-center justify-between w-[90vw] md:w-[850px] space-y-4 mt-6 ">
                    <div className="flex items-center space-x-4 ">
                        <div className="w-8 h-8 rounded-full  loader-animate" ></div>
                        <div className='w-16 h-2 loader-animate'></div>
                    </div>
                    <div className=' w-16 h-6 rounded-lg loader-animate '></div>
                </div >
            )
            }
        </>
    )
}

export default SearchLoader