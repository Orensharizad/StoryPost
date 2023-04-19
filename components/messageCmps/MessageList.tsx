import React, { useEffect, useRef } from 'react'
import { Message, User } from '@/models/globalModel';
import MessagePreview from './MessagePreview';

type Props = {
    messages: Message[]
    selectedUser: User
}

function MessageList({ messages, selectedUser }: Props) {

    const scrollRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        onScrollDown()

    }, [])


    function onScrollDown() {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        // scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }



    return (
        <div ref={scrollRef} className='px-5 py-5 w-full h-[90vh] md:h-[80vh] flex flex-col space-y-4 overflow-y-scroll overflow-x-hidden scrollbar-thumb-black scrollbar-thin'>
            {messages?.map((message: Message) =>
                <MessagePreview key={message.id} message={message} selectedUser={selectedUser} />

            )}</div>
    )
}

export default MessageList