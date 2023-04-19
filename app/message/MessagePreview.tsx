import React from 'react'
import { Message, User } from '../models/globalModel'
import { useAppDispatch, useAppSelector } from '@/hooks/stateHook';

type Props = {
    message: Message
    selectedUser: User
}

function MessagePreview({ message }: Props) {
    const { user: loggdinUser } = useAppSelector((state) => state.user)

    return (
        <>
            {message.user._id === loggdinUser?._id ?


                <div className='bg-[#efefef] p-4 w-fit rounded-3xl self-end  max-w-[180px] break-text '>
                    <p className=''>{message.message}</p>
                </div>

                :


                <div className='flex items-center space-x-1 self-start max-w-[180px] break-text '>
                    <img className='w-6 h-6 rounded-full object-cover self-end' src={message.user.userImg} alt="" />
                    <p className='border border-slate-200 p-4 w-fit rounded-3xl break-text '>{message.message}</p>
                </div>

            }

        </>
    )
}

export default MessagePreview