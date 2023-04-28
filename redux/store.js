import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './AuthSlice'
import DarkModeReducer from './DarkModeReducer'
import SiteSlice from './SiteSlice'

export const store = configureStore({
  reducer: {
    UserAuth: AuthSlice,
    darkMode : DarkModeReducer,
    sites: SiteSlice
  },
})