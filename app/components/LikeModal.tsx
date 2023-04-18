import React from 'react'
import { Like } from '../models/globalModel'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'


type Props = {
    likes: Like[]
    setIsOpenLikeModal: React.Dispatch<React.SetStateAction<boolean>>
}

function LikeModal({ likes, setIsOpenLikeModal }: Props) {

    const onCloseModal = () => {
        setIsOpenLikeModal(prev => !prev)
    }
    return (
        <section>
            <div onClick={onCloseModal} className="black-screen"></div>
            <div className='modal w-[400px] h-[450px] rounded-lg'>
                <div className='text-center py-2 border border-b-slate-300 font-semibold'>
                    <h3>Likes</h3>
                    <XMarkIcon onClick={onCloseModal} className='w-5 h-5 absolute top-3 right-2 cursor-pointer' />
                </div>
                <div className='overflow-y-scroll h-[90%] '>
                    {likes.map((like: Like) =>
                        <div className='p-4 flex items-center justify-between ' key={like._id}>
                            <Link href={`/profile/${like.createdBy.userId}`} className='flex items-center space-x-2'>
                                <img className='w-11 h-11 rounded-full object-cover' src={like.createdBy.userImg} alt="" />
                                <p className='font-semibold'>{like.createdBy.fullname}</p>
                            </Link>
                            <button className='px-5 py-1 bg-[#0095f6] hover:bg-[#1887f2] rounded-md text-white font-semibold'>Follow</button>
                        </div>

                    )}

                </div>

            </div>
        </section>
    )
}

export default LikeModal