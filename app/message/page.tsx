'use client'
import { useEffect, useState } from 'react'
import SideBar from '../../components/SideBar'
import { useAppSelector } from '@/hooks/stateHook';
import { userService } from '@/services/userService'
import { MessageHeroIcon } from '../iconLibary'
import UserLoader from '../../components/UserLoader'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import Chat from '../../components/messageCmps/Chat'
import { User } from '@/models/globalModel';

function Message() {
    const { user: loggdinUser } = useAppSelector((state) => state.user)
    const [users, setUsers] = useState<User[]>([])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [chatId, setChatId] = useState<any>(null)


    useEffect(() => {
        loadUsers()
    }, [])

    const loadUsers = async () => {
        try {
            const users = await userService.getUsers()


            setUsers(users.filter((user: User) => user._id !== loggdinUser?._id))
        } catch (err) {
            console.log('err: cannot load Users', err)
        }
    }

    const onSelectUser = async (user: User) => {

        const combinedId = loggdinUser?._id > user._id ? loggdinUser?._id + user._id : user._id + loggdinUser?._id
        setChatId(combinedId)

        const res = await getDoc(doc(db, 'chats', combinedId))
        if (!res.exists()) {
            await setDoc(doc(db, 'chats', combinedId), { messages: [] })
        }
        setSelectedUser(user)

    }


    return (
        <div className='grid grid-cols-6 md:h-screen w-full bg-[#fafafa]'>
            <section className={`col-span-1 md:border md:border-r-slate-200 bg-white ${selectedUser && 'hidden md:inline-grid'} `}>
                <SideBar />
            </section>
            <section className='border border-slate-300 my-auto  col-span-6 md:col-span-5 md:w-3/4 mx-auto  grid grid-cols-3 h-[95vh] bg-white rounded-md relative w-full  '>
                <div className={`col-span-3 md:col-span-1 border border-r-slate-300 ${selectedUser ? 'hidden md:inline-block' : ''} `}>
                    <h2 className='text-center font-semibold p-4 border border-b-slate-300'>{loggdinUser?.fullname}</h2>
                    <div className='flex flex-col space-y-2'>
                        {!users.length ? <UserLoader />
                            :
                            users.map((user: User) =>
                                <div onClick={() => onSelectUser(user)} className={`flex items-center hover:opacity-80 cursor-pointer space-x-2 py-2 px-5  ${selectedUser?._id === user._id && 'bg-[#efefef]'}`} key={user._id}>
                                    <img className='w-14 h-14 rounded-full object-cover' src={user.userImg} alt="userImg" />
                                    <p className='text-sm'>{user.fullname}</p>

                                </div>
                            )
                        }
                    </div>


                </div>
                <div className={`col-span-3 md:col-span-2  `} >
                    {selectedUser
                        ? <Chat selectedUser={selectedUser} chatId={chatId} setSelectedUser={setSelectedUser} />
                        : <div className={` col-span-3 md:col-span-2 h-full hidden md:inline `}>
                            <div className='flex flex-col items-center space-y-2 justify-center h-full'>
                                <MessageHeroIcon />
                                <h3 className='text-xl'>Your Messages</h3>
                                <p className='text-[#737373] text-sm'>Send private photos and messages to a friend or group.</p>
                                <button onClick={() => onSelectUser(users[0])} className='bg-[#0095f6] text-white rounded-lg py-2 px-4 text-sm font-semibold border-none hover:bg-[#1877f2]'>Send Message</button>
                            </div>
                        </div>}
                </div>
            </section>
        </div >
    )
}

export default Message