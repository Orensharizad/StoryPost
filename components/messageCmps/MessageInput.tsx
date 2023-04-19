

type Props = {
    onSubmit: Function
    handleChange: Function
    message: string
}

function MessageInput({ onSubmit, handleChange, message }: Props) {

    return (
        <form onSubmit={(ev) => onSubmit(ev)} className='absolute bottom-3 md:bottom-0 flex md:px-10 md:py-5 space-x-2 border-t border-gray-100 w-full ' >
            <input value={message} onChange={(ev) => handleChange(ev)} className='flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent md:px-5 md:py-3 ' type="text" placeholder='message...' />
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'>Send</button>
        </form>
    )
}

export default MessageInput