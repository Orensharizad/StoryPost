import React from 'react'
import Image from "next/image";


function LoginSignUp() {
    return (
        <div className="h-screen bg-gray-50 flex flex-col justify-center items-center">
            <div className="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3">
                <Image
                    src='https://links.papareact.com/ocw'
                    width={300}
                    height={300}
                    alt="logo"
                />
                <form className="mt-8 w-64 flex flex-col">
                    <input
                        className="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                        id="email" placeholder="Phone number, username, or email" type="text" />
                    <input
                        className="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                        id="password" placeholder="Password" type="password" />
                    <a className=" text-sm text-center bg-blue-300 text-white py-1 rounded font-medium">
                        Log In
                    </a>

                    <div className="bg-white  text-center  py-4">
                        <span className="text-sm">Don't have an account?</span>
                        <a className="text-blue-500 text-sm font-semibold">Sign up</a>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default LoginSignUp