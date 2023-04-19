import { userService } from "@/services/userService"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from '@/hooks/stateHook';
import { User } from "@/models/globalModel"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import SearchLoader from "./SearchLoader"
import Link from "next/link"

type Props = {
    search: string

}

function SearchUsers({ search, }: Props) {
    const { user: loggdinUser } = useAppSelector((state) => state.user)
    const [users, setUsers] = useState<User[]>([])
    const [isloading, setIsLoading] = useState(true)

    useEffect(() => {
        loadUsers()

        setTimeout(() => {
            setIsLoading(false)
        }, 3000);

    }, [])

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

    return (
        <div >
            {
                (!users.length && isloading) ? <SearchLoader />
                    :
                    users?.map((user: User) =>
                        <div className="flex items-center justify-between w-[90vw] md:w-[850px] space-y-4 mt-6" key={user._id}>
                            <div className="flex items-center space-x-4">
                                <img className="w-8 h-8 rounded-full object-cover" src={user.userImg} alt="" />
                                <p className="font-semibold">{user.fullname}</p>
                            </div>
                            <Link href={`/profile/${user._id}`} className='bg-[#0095f6] text-white rounded-lg py-2 px-4 text-sm font-semibold border-none hover:bg-[#1877f2]'>View</Link>
                        </div>
                    )}

            {!users.length && !isloading && <div className="w-[90vw] md:w-[850px] space-y-4 mt-6">

                <h3>Cannot Find User</h3>
            </div>}
        </div>
    )
}

export default SearchUsers