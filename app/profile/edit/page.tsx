'use client'

import { useAppDispatch, useAppSelector } from '@/hooks/stateHook';
import SideBar from '@/components/SideBar'
import { AdICon, MetaIcon, PassIcon, PayIcon, PersonIcon } from '@/app/iconLibary';
import { uploadService } from '@/services/upload.service';
import { userService } from '@/services/userService';
import { setUser } from '@/store/userSlice';
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-hot-toast';



function EditProfile() {

    const { user } = useAppSelector((state) => state.user)
    const [fullname, setFullName] = useState<string | undefined>(user?.fullname)
    const [userImg, setUserImg] = useState<string | undefined>(user?.userImg)
    const dispatch = useAppDispatch()
    const router = useRouter()



    const handleChangeFullname = async (ev: ChangeEvent<HTMLInputElement>) => {
        const { value } = ev.target
        setFullName(value)
    }
    const handleChangeImg = async (ev: ChangeEvent<HTMLInputElement>) => {
        const notification = toast.loading('loading...')

        try {
            const { secure_url } = await uploadService.uploadImg(ev)
            setUserImg(secure_url)
            toast.success('Successfully !', {
                id: notification
            })
        } catch (err) {
            console.log('err cannot upload img:', err)
        }
    }
    const handleSave = async () => {
        const notification = toast.loading('loading...')

        const newUser = { ...user, fullname, userImg }

        try {
            const updatedUser = await userService.update(newUser)
            dispatch(setUser(updatedUser))
            router.push(`/profile/${user?._id}`)
            toast.success('Successfully !', {
                id: notification
            })
        } catch (err) {
            console.log('err:', err)

        }

    }


    return (
        <div className='grid grid-cols-5 '>
            <section className='col-span-1  '>
                <SideBar />
            </section>
            <section className=' mt-8 grid grid-cols-4 col-span-5 md:col-span-4 max-w-6xl mx-auto border w-full h-full '>
                <div className='col-span-1 border border-r-slate-200 p-10 hidden  md:flex flex-col space-y-2  text-xs'>
                    <MetaIcon />
                    <p className='text-lg'>Accounts Center</p>
                    <p>Manage your connected experiences and account settings across Meta technologies.</p>
                    <div className='flex items-center space-x-2'>
                        <PersonIcon />
                        <p>Personal details</p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <PassIcon />
                        <p>Password and security</p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <AdICon />
                        <p>Ad preferences</p>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <PayIcon />
                        <p>Payments</p>
                    </div>

                </div>
                <div className='col-span-3 p-10'>

                    <div className='flex items-center space-x-2'>
                        <img className='w-12 h-12 rounded-full' src={userImg} alt="" />
                        <div className='flex flex-col '>
                            <p>{user?.fullname}</p>
                            <label htmlFor="upload-img">
                                <p className='text-[#0095f6] hover:text-[#00376b] font-semibold text-sm cursor-pointer'>Change profile photo</p>
                                <input onChange={(ev) => handleChangeImg(ev)} id='upload-img' className='hidden' type="file" />
                            </label>
                        </div>
                    </div>
                    <div className='flex items-center space-x-2 mt-5'>
                        <p className='font-semibold'>Fullname: </p>
                        <input onChange={(ev) => handleChangeFullname(ev)} value={fullname} className="bg-gray-50 block pl-3 sm:text-sm border-gray-300  focus:ring-black focus:border-black rounded-md" type="text" placeholder="Fullname" />
                    </div>

                    <button onClick={handleSave} className='text-[#0095f6] hover:text-[#00376b] font-semibold'>Save</button>



                </div>
            </section >

        </div >
    )
}

export default EditProfile