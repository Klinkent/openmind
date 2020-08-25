import { createSlice } from '@reduxjs/toolkit'

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    isLoading: false,
    isLoggedIn: [],
    currentUser: {
      username: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      bio: localStorage.getItem('bio'),
      image: localStorage.getItem('image'),
      token: localStorage.getItem('token'),
    },
  },
  reducers: {
    LOADING: (state) => {
      state.isLoading = true
    },
    SET_AUTHORIZED: (state, action) => {
      state.isLoading = false
      state.isLoggedIn = true
      state.currentUser = action.payload
    },
    SET_UNAUTHORIZED: (state) => {
      state.isLoggedIn = false
    },
  },
})

export default currentUserSlice
