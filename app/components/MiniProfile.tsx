'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/stateHook';
import { setUser } from '../../store/userSlice'
import Link from 'next/link'

function MiniProfile() {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.user)



    const onSignOut = () => {
        dispatch(setUser(null))
    }

    return (
        <div className='flex items-center justify-between mt-14 ml-10'>
            <Link href={`/profile/${user?._id}`}>
                <img className='w-16 h-16 rounded-full border p-[2px] ' src={user?.userImg} alt="" />
            </Link>

            <div className='flex-1 mx-4'>
                <h2 className='font-bold'>{user?.fullname}</h2>
                <h3 className='text-sm text-gray-400'>Welcome to Instegram</h3>
            </div>
            <button onClick={onSignOut} className='text-blue-400 text-sm font-semibold'>Sign Out</button>
        </div>
    )
}

export default MiniProfile