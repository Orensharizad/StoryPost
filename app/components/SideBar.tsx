'use client'
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "../Hooks/stateHook"
import { CreateIcon, ExploreIcon, HeartIcon, HomeIcon, MsgIcon, SearchIcon } from "../iconLibary"
import { setIsOpenAddPostModal, setIsOpenSearchModal, setSideBarType } from "../../store/userSlice"
import Link from "next/link"
import SearchModal from "./SearchModal"



function SideBar() {

    const { user, sideBarType, isOpenSearchModal } = useAppSelector((state) => state.user)
    const dispatch = useAppDispatch()

    const onSetType = (type: string) => {
        dispatch(setSideBarType(type))

    }

    return (

        <nav className=" w-full md:w-auto bg-gray-100 md:bg-inherit fixed bottom-0 flex  md:border-none border border-t-slate-300 h-16 px-2 md:flex-col md:h-screen md:top-10 md:bottom-0 md:left-4  ">
            <Link href={'/'} className="hidden  md:inline-block" >
                <div className={`w-24 h-10 hidden xl:inline-grid cursor-pointer ${isOpenSearchModal && 'xl:hidden'} `}>
                    <Image
                        src='https://links.papareact.com/ocw'
                        alt="logo"
                        width={120}
                        height={80}

                    />
                </div>

                <div className={`w-10 h-10    cursor-pointer ${isOpenSearchModal ? 'xl:inline-block' : 'xl:hidden'}`}>
                    <Image
                        src='https://links.papareact.com/jjm'
                        alt="logo"
                        width={30}
                        height={30}


                    />
                </div>
            </Link>
            <div className="mt-6 w-full md:w-auto  flex items-center z-10   justify-around md:flex-col md:justify-start md:items-start">
                <Link onClick={() => onSetType('home')} href={'/'} className={`nav-item ${sideBarType === 'home' && 'selected'} `} >
                    <HomeIcon />
                    <p className={`hidden xl:inline-block ${isOpenSearchModal && 'xl:hidden'}`}>Home</p>
                </Link>
                <div onClick={() => dispatch(setIsOpenSearchModal(true))} className="nav-item  hidden sm:inline-flex ">
                    <SearchIcon />
                    <p className={`hidden xl:inline-block ${isOpenSearchModal && 'xl:hidden'}`}>Search</p>
                </div>
                <Link onClick={() => onSetType('explore')} href={'/explore'} className={`nav-item ${sideBarType === 'explore' && 'selected'} `}>
                    <ExploreIcon />
                    <p className={`hidden xl:inline-block ${isOpenSearchModal && 'xl:hidden'}`}>Explore</p>
                </Link>
                <Link onClick={() => onSetType('message')} href={'/message'} className={`nav-item ${sideBarType === 'message' && 'selected'} `}>
                    <MsgIcon />
                    <p className={`hidden xl:inline-block ${isOpenSearchModal && 'xl:hidden'}`}>Messages</p>
                </Link>
                <div className="nav-item hidden  sm:inline-flex  ">
                    <div className="relative">
                        <HeartIcon />
                        <span className="absolute -top-2 -right-4 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">3</span>
                    </div>
                    <p className={`hidden xl:inline-block ${isOpenSearchModal && 'xl:hidden'}`}>Notifications
                    </p>
                </div>
                <div onClick={() => dispatch(setIsOpenAddPostModal(true))} className="nav-item  ">
                    <CreateIcon />
                    <p className={`hidden xl:inline-block ${isOpenSearchModal && 'xl:hidden'}`}>Create
                    </p>
                </div>
                <Link onClick={() => onSetType('profile')} href={`/profile/${user?._id}`} className={`nav-item ${sideBarType === 'profile' && 'selected'} `}>
                    <img className="w-6 h-6 rounded-full" src={user?.userImg} alt="" />
                    <p className={`hidden xl:inline-block ${isOpenSearchModal && 'xl:hidden'}`}>Profile
                    </p>
                </Link>

            </div>


        </nav>
    )
}

export default SideBar