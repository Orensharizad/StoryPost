import React from 'react'

function SuggestionsLoader() {

    const loader = ['1', '2', '3', '4', '5']


    return (
        <section className='mt-4 ml-10 '>
            <div className='flex justify-between text-sm mb-5 '>
                <div className='text-sm font-bold text-gray-400 w-24 h-2 loader-animate'></div>
                <div className='text-gray-600 font-semibold w-12 h-2 loader-animate'></div>
            </div>
            {loader.map((num: string, idx) =>
                <div key={idx} className='flex items-center justify-between mt-3 '>
                    <div className='w-10 h-10 rounded-full loader-animate '></div>
                    <div className='flex-1 ml-4'>
                        <div className='font-semibold text-sm w-12 h-2 loader-animate'></div>

                    </div>
                    <div className='text-blue-400 text-xs font-semibold w-12 h-2 loader-animate'></div>

                </div>
            )
            }



        </section >
    )
}

export default SuggestionsLoader