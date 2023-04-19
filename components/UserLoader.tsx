import React from 'react'

function UserLoader() {

    const loader = [
        { loader: '' },
        { loader: '' },
        { loader: '' },
        { loader: '' },
        { loader: '' },
        { loader: '' },
    ]

    return (
        <>
            {loader.map((loader: any, idx) =>

                <div key={idx} className='flex items-center space-x-3 py-2 px-5' >
                    <div className='w-14 h-14 rounded-full loader-animate'></div>
                    <div className='w-[50%] h-2 loader-animate'></div>
                </div >
            )}
        </>
    )
}

export default UserLoader