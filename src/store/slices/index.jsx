import { createSlice } from '@reduxjs/toolkit'

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: [{ isLoading: false, isLoggedIn: null, currentUser: null }],
  reducers: {
    LOADING: (state) => {
      state.push({ isLoading: true })
    },
    SET_AUTHORIZED: (state, action) => {
      state.push({
        isLoggedIn: true,
        isLoading: false,
        currentUser: action.payload,
      })
    },
    SET_UNAUTHORIZED: (state) => {
      state.push({
        isLoggedIn: false,
      })
    },
  },
})

export default currentUserSlice

// export const CurrentUserContext = createContext()

// export const CurrentUserProvider = ({ children }) => {
//   const value = useReducer(reducer, initialState)

//   return (
//     <CurrentUserContext.Provider value={value}>
//       {children}
//     </CurrentUserContext.Provider>
//   )
// }

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'LOADING':
//       return { ...state, isLoading: true }
//     case 'SET_AUTHORIZED':
//       return {
//         ...state,
//         isLoggedIn: true,
//         isLoading: false,
//         currentUser: action.payload,
//       }
//     case 'SET_UNAUTHORIZED':
//       return {
//         ...state,
//         isLoggedIn: false,
//       }
//     default:
//       return state
//   }
// }
