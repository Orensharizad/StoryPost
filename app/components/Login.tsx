'use client'
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "../Hooks/stateHook";
import { User } from "../models/globalModel";
import { userService } from "../services/userService";
import { setUser } from "../store/userSlice";

function Login() {
    const [userCred, setUserCred] = useState(userService.getEmptyUser())
    const [isSignIn, setIsSignIn] = useState(false)
    const dispatch = useAppDispatch()

    const onSignIn = async (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault()
        const notification = toast.loading('loading...')


        try {
            const user: User = await userService.login(userCred)
            toast.success('Successfully toasted!', {
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



    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        const { name: filed, value } = ev.target
        setUserCred(prev => ({ ...prev, [filed]: value }))

    }



    return (
        <div className=" h-screen flex flex-col items-center justify-center text-center">
            <Image
                src='https://links.papareact.com/ocw'
                width={300}
                height={300}
                alt="logo"
            />

            {
                isSignIn ?
                    <form onSubmit={onSignUp} className="flex flex-col" >
                        <input onChange={handleChange} name="username" type="text" placeholder="username" />
                        <input onChange={handleChange} name="fullname" type="text" placeholder="fullname" />
                        <input onChange={handleChange} name="password" type="password" placeholder="••••••••" />
                        <input onChange={handleChange} name="userImg" type="file" />
                        <button>Sign Up</button>
                    </form>
                    :
                    <form onSubmit={onSignIn} className="flex flex-col">
                        <input onChange={handleChange} name="username" type="text" placeholder="username" />
                        <input onChange={handleChange} name="password" type="password" placeholder="••••••••" />
                        <button>Sign In</button>
                    </form>

            }
            <button onClick={() => setIsSignIn(prev => !prev)}>{!isSignIn ? "Can't log in? Sign up for an account" : 'Already have an account? Log In'}</button>



        </div>
    )
}

export default Login