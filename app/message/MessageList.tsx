import React, { useEffect, useRef } from 'react'
import { Message, User } from '../models/globalModel';
import MessagePreview from './MessagePreview';

type Props = {
    messages: Message[]
    selectedUser: User
}

function MessageList({ messages, selectedUser }: Props) {



    return (
        <div className='px-5 py-5 w-full h-[90vh] md:h-[80vh] flex flex-col space-y-4 overflow-y-scroll overflow-x-hidden scrollbar-thumb-black scrollbar-thin'>{messages?.map((message: Message) =>
            <MessagePreview key={message.id} message={message} selectedUser={selectedUser} />

        )}</div>
    )
}

export default MessageList