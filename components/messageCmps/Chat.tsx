import React, { useEffect, useState } from 'react'
import { User } from '@/models/globalModel'
import { Timestamp, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { utilService } from '@/services/utilService'
import { useAppSelector } from '@/hooks/stateHook';
import { ChevronLeftIcon } from '@heroicons/react/24/solid'

type Props = {
    selectedUser: User
    chatId: any
    setSelectedUser: React.Dispatch<React.SetStateAction<null | User>>
}

function Chat({ selectedUser, chatId, setSelectedUser }: Props) {

    const [messages, setMessages] = useState<any>(null)
    const [message, setMessage] = useState<string>('')
    const { user: loggdinUser } = useAppSelector((state) => state.user)


    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'chats', chatId), (doc) => {
            if (doc.exists()) {
                setMessages(doc.data().messages)
            }

            return () => {
                unSub()
            }
        })

    }, [chatId])


    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = ev.target
        setMessage(value)

    }

    const onSubmit = async (ev: React.FormEvent<HTMLFormElement>,) => {
        ev.preventDefault()
        if (!message) return
        try {
            setMessage('')
            await updateDoc(doc(db, 'chats', chatId), {
                messages: arrayUnion({
                    id: utilService.makeId(),
                    message,
                    user: loggdinUser,
                    date: Timestamp.now()

                })
            })
        } catch (err) {
            console.log('err:', err)

        }


    }

    return (
        <section className='col-span-3 md:col-span-2 relative h-[100vh] md:h-full '>
            <div className='bg-white absolute top-0 flex items-center z-20 space-x-3 border-b border-b-slate-300 py-2 w-full h-11 px-4 md:hidden'>
                <ChevronLeftIcon onClick={() => setSelectedUser(null)} className='w-8 h-8 font-bold ' />
                <img className='w-8 h-8 rounded-full object-cover ' src={selectedUser.userImg} alt="" />
                <p className='font-semibold'>{selectedUser.fullname}</p>
            </div>
            <MessageList messages={messages} selectedUser={selectedUser} />
            <MessageInput onSubmit={onSubmit} handleChange={handleChange} message={message} />
        </section>
    )
}

export default Chat