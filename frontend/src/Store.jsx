import {configureStore} from '@reduxjs/toolkit'
import userSlice from './Redux/UserSlice'
export const store = configureStore({
    reducer: { user:userSlice }
});