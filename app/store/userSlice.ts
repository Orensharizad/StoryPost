
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../models/globalModel'
import { userService } from '../services/userService'
import type { RootState } from './store'

// Define a type for the slice state
interface UserState {
    user: User | null
}

// Define the initial state using that type
const initialState: UserState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        // Use the PayloadAction type to declare the contents of `action.payload`
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
        },
    },
})

export const { setUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const user = (state: RootState) => state.user

export default userSlice.reducer