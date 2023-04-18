'use client'

import { Provider } from "react-redux";
import { useAppSelector } from "../Hooks/stateHook";
import { store } from "../../store/store";
import Login from "./Login";
import { ReduxProvider } from "./ReduxProvider";
import UserMsg from "./UserMsg";


type Props = {
    children: React.ReactNode;

}

export function SessionProvider({ children }: Props) {

    return (
        <Provider store={store}>
            <ReduxProvider>
                {children}
            </ReduxProvider>

        </Provider>


    )
}