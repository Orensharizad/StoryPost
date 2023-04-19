import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useRef, useState } from 'react'
import SearchUsers from './SearchUsers'
import { useAppDispatch, useAppSelector } from '@/hooks/stateHook';
import { User } from '@/models/globalModel'
import { userService } from '@/services/userService'
import Link from 'next/link'
import { setIsOpenSearchModal } from '@/store/userSlice'
import useCloseModal from '@/hooks/useCloseModal';

type Props = {}

function SearchModal({ }: Props) {
    const [search, setSearch] = useState<string>('')
    const { user: loggdinUser } = useAppSelector((state) => state.user)
    const [users, setUsers] = useState<User[]>([])
    const [isloading, setIsLoading] = useState(true)
    const modalRef = useRef<HTMLInputElement | null>(null)
    const { isOpenSearchModal } = useAppSelector((state) => state.user)


    const dispatch = useAppDispatch()

    useCloseModal(modalRef, () => dispatch(setIsOpenSearchModal(false)))


    useEffect(() => {
        loadUsers()

        setTimeout(() => {
            setIsLoading(false)
        }, 3000);

    }, [search])

    const loadUsers = async () => {
        try {
            const users = await userService.getUsers()
            let usersWithoutLoggdinUser = users.filter((user: User) => user._id !== loggdinUser?._id)
            const regex = new RegExp(search, 'i')
            usersWithoutLoggdinUser = usersWithoutLoggdinUser.filter((user: User) => regex.test(user.fullname))
            setUsers(usersWithoutLoggdinUser)
        } catch (err) {
            console.log('err: cannot load Users', err)
        }
    }

    const handleSearch = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = ev.target
        setSearch(value)

    }

    return (
        <div ref={modalRef} className={`fixed top-0 bottom-0  w-96 h-[100vh] z-50 bg-white border-l border-r border-slate-300 shadow-sm rounded-2xl ${!isOpenSearchModal ? 'left-[-550px] ' : 'left-[70px]'} transition-all duration-500 ease-in-out `}>
            <div className='flex flex-col space-y-8 px-6 pb-9'>
                <h3 className='font-semibold text-2xl pt-6 '>Search</h3>
                <div className="relative mt-1  rounded-md ">
                    <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none h-10">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
                    </div>
                    <input onChange={(ev) => handleSearch(ev)} className="bg-[#efefef] block w-full pl-10 sm:text-sm shadow-sm border-none  focus:outline-none focus:ring-0 rounded-md" type="text" placeholder="Search" />
                </div>
            </div>
            <hr />
            {search && <div>
                {users.map((user: User) =>
                    <div className="flex items-center justify-between w-full space-y-2 mt-2 px-6" key={user._id}>
                        <div className="flex items-center space-x-4">
                            <img className="w-8 h-8 rounded-full object-cover" src={user.userImg} alt="" />
                            <p className="font-semibold">{user.fullname}</p>
                        </div>
                        <Link href={`/profile/${user._id}`} className='bg-[#0095f6] text-white rounded-lg py-2 px-4 text-sm font-semibold border-none hover:bg-[#1877f2]'>View</Link>
                    </div>

                )}

                {!users.length && search && <p>Cannot Find User</p>}


            </div>}



        </div>
    )
}

export default SearchModal