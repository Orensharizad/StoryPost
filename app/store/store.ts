import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'

const defaultMiddlewareConfig = {
    serializableCheck: {
        ignoredPaths: ["stay.filterBy.searchBy.startDate", "stay.filterBy.searchBy.endDate"],
    }
};

export const store = configureStore({
    reducer: {
        user: userSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware(defaultMiddlewareConfig),
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch