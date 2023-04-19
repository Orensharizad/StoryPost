
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Post, User } from '@/models/globalModel'
import type { RootState } from './store'

// Define a type for the slice state
interface UserState {
    user: User | null
    isOpenAddPostModal: boolean
    posts: Post[] | null
    sideBarType: string
    isOpenSearchModal: boolean
}

// Define the initial state using that type
const initialState: UserState = {
    user: null,
    isOpenAddPostModal: false,
    isOpenSearchModal: false,
    posts: [],
    sideBarType: ''
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
        setPosts: (state, action: PayloadAction<Post[] | null>) => {
            state.posts = action.payload
        },
        setIsOpenAddPostModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenAddPostModal = action.payload
        },
        setIsOpenSearchModal: (state, action: PayloadAction<boolean>) => {
            state.isOpenSearchModal = action.payload
        },
        setSideBarType: (state, action: PayloadAction<string>) => {
            state.sideBarType = action.payload
        },
    },
})

export const { setUser, setIsOpenAddPostModal, setPosts, setSideBarType, setIsOpenSearchModal } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const user = (state: RootState) => state.user

export default userSlice.reducer