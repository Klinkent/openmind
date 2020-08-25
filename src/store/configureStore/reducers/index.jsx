import { configureStore } from '@reduxjs/toolkit'
import currentUserSlice from '../../slices/index'

// комбайн редьюсеров не обязателен - конфиг стор сам вызовет комбайн, если посчитает нужным
// инициализация стора
const store = configureStore({
  reducer: {
    currentUser: currentUserSlice.reducer,
  },
})

export default store
