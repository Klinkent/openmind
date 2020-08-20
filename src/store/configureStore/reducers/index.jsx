import { configureStore } from '@reduxjs/toolkit'
import currentUserSlice from '../../slices/index'

// комбайн редьюсеров не обязателен - конфиг стор сам вызовет комбайн, если посчитает нужным

const store = configureStore({
  reducer: {
    currentUser: currentUserSlice.reducers,
  },
})

export default store