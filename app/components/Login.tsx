'use client'
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../Hooks/stateHook";
import { User } from "../models/globalModel";
import { setUser } from "../../store/userSlice";
import { userService } from "@/services/userService";
import { uploadService } from "@/services/upload.service";
import LoginSignUp from "./LoginSignUp";

function Login() {
    const [userCred, setUserCred] = useState(userService.getEmptyUser())
    const [isSignIn, setIsSignIn] = useState(false)
    const dispatch = useAppDispatch()

    const onSignIn = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const notification = toast.loading('loading...')


        try {
            const user: User = await userService.login(userCred)
            toast.success('Successfully !', {
                id: notification
            })
            dispatch(setUser(user))

        } catch (err) {
            toast.error('Invalid username or password', {
                id: notification
            })
        }

    }

    const onSignUp = async (ev: FormEvent<HTMLFormElement>) => {

        ev.preventDefault()
        const notification = toast.loading('loading...')

        try {
            await userService.signup(userCred)
            toast.success('Successfully toasted!', {
                id: notification
            })
            dispatch(setUser(userCred))

        } catch (err) {
            toast.error('Username already taken ', {
                id: notification
            })
        }

    }

    const handleChangeImg = async (ev: React.ChangeEvent<HTMLInputElement>) => {
        const notification = toast.loading('loading...')

        try {
            const { secure_url } = await uploadService.uploadImg(ev)
            setUserCred((prev: User) => ({ ...prev, userImg: secure_url }))
            toast.success('Successfully !', {
                id: notification
            })
        } catch (err) {
            console.log('err cannot upload img:', err)
        }
    }

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { name: filed, value } = ev.target
        setUserCred((prev: User) => ({ ...prev, [filed]: value }))

    }



    return (
        <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
            <div className="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3">
                <Image
                    src='https://links.papareact.com/ocw'
                    width={300}
                    height={300}
                    alt="logo"
                />
                {!isSignIn ?
                    <form onSubmit={onSignIn} className="mt-8 w-64 flex flex-col">
                        <input
                            onChange={(ev) => handleChange(ev)}
                            className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                            placeholder="Phone number, username, or email" name="username" type="text" value={userCred.username} />
                        <input
                            onChange={(ev) => handleChange(ev)}
                            className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                            value={userCred.password} placeholder="Password" type="password" name="password" />
                        <button className=" text-sm text-center  bg-[#0095f6] hover:bg-[#1887f2] text-white py-1 rounded font-medium">
                            Log In
                        </button>



                    </form>
                    :
                    <form onSubmit={onSignUp} className="mt-8 w-64 flex flex-col">
                        <input
                            onChange={(ev) => handleChange(ev)}
                            className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                            placeholder="Phone number, username, or email" name="username" type="text" value={userCred.username} />
                        <input
                            onChange={(ev) => handleChange(ev)}
                            className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                            placeholder="Fullname" type="text" name="fullname" value={userCred.fullname} />
                        <input
                            onChange={(ev) => handleChange(ev)}
                            className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                            value={userCred.password} placeholder="Password" name="password" type="password" />
                        <label className=" text-sm font-semibold w-full mb-4 rounded border  bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none text-center cursor-pointer" htmlFor="signup-upload" >
                            <p>Upload Profile Image</p>
                            <input onChange={handleChangeImg} name="userImg" type="file" id="signup-upload" className="hidden" />
                        </label>
                        <button className=" text-sm text-center  bg-[#0095f6] hover:bg-[#1887f2] text-white py-1 rounded font-medium">
                            Sign up
                        </button>



                    </form>
                }
                <div onClick={() => setIsSignIn(prev => !prev)} className="bg-white  text-center  py-4 cursor-pointer">
                    <span className="text-sm">{!isSignIn ? <p>Don't have an account?<span className="text-blue-500 text-sm font-semibold">Sign up</span></p> : <p>Don't have an account?<span className="text-blue-500 text-sm font-semibold">Sign in</span></p>}</span>

                </div>
            </div>
        </div>

    )
}

export default Login