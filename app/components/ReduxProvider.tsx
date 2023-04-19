'use client'
import { useAppDispatch, useAppSelector } from '@/hooks/stateHook';
import AddPostModal from "./AddPostModal";
import Login from "./Login";
import SearchModal from "./SearchModal";
import UserMsg from "./UserMsg";

type Props = {
    children: React.ReactNode;

}

export function ReduxProvider({ children }: Props) {
    const { user, isOpenAddPostModal } = useAppSelector((state) => state.user)

    return (
        <div>
            <UserMsg />
            {user ?
                <div>
                    {children}
                    <SearchModal />
                    {isOpenAddPostModal && <AddPostModal />}

                </div>
                : <Login />}
        </div>

    )
}