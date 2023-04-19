'use client'
import { Provider } from "react-redux";
import { store } from "../store/store";
import { ReduxProvider } from "./ReduxProvider";


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