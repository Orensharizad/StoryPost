'use client'
import { useAppSelector } from "../Hooks/stateHook";
import Login from "./Login";
import UserMsg from "./UserMsg";

type Props = {
    children: React.ReactNode;

}

export function ReduxProvider({ children }: Props) {
    const { user } = useAppSelector((state) => state.user)

    return (
        <div>
            <UserMsg />
            {user ?
                <div>
                    {children}
                </div>
                : <Login />}
        </div>

    )
}