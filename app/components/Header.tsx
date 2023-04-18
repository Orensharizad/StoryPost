'use client'
import Image from "next/image"
import { MagnifyingGlassIcon, PlusCircleIcon, UserGroupIcon, HeartIcon, PaperAirplaneIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { HomeIcon } from '@heroicons/react/24/solid'
// import { useAppDispatch, useAppSelector } from "../Hooks/stateHook"
import { setIsOpenAddPostModal } from "../../store/userSlice"
import { useAppDispatch, useAppSelector } from "../Hooks/stateHook"


function Header() {



    const { user } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()




    return (


        <header className=" shadow-sm border-b bg-white sticky top-0 z-50 " >
            <nav className="flex justify-between bg-white max-w-6xl mx-5 xl:mx-auto py-3">

                <div >
                    <div className="relative w-24 h-10 hidden lg:inline-grid cursor-pointer ">
                        <Image
                            src='https://links.papareact.com/ocw'
                            alt="logo"
                            fill

                        />
                    </div>

                    <div className="relative w-10 h-10  lg:hidden flex-shrink-0 cursor-pointer">
                        <Image
                            src='https://links.papareact.com/jjm'
                            alt="logo"
                            fill
                            className="object-contain"

                        />
                    </div>
                </div>
                <div className="relative mt-1  rounded-md ">
                    <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />

                    </div>
                    <input className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300  focus:ring-black focus:border-black rounded-md" type="text" placeholder="Search" />
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <HomeIcon className="btn-header md:inline-flex " />
                    <Bars3Icon className="h-6 md:hidden cursor-pointer" />
                    <div className="relative btn-header md:inline-flex ">
                        <PaperAirplaneIcon className="btn-header md:inline-flex rotate-[300deg] " />
                        <span className="absolute -top-2 -right-4 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">3</span>

                    </div>
                    <PlusCircleIcon onClick={() => dispatch(setIsOpenAddPostModal(true))} className="btn-header md:inline-flex" />
                    <UserGroupIcon className="btn-header md:inline-flex" />
                    <HeartIcon className="btn-header md:inline-flex" />

                    <img src={user?.userImg} className="h-10 w-10 rounded-full cursor-pointer  " />

                </div>
            </nav>
        </header>
    )
}

export default Header