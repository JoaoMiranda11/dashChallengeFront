import { Session } from '@/types/auth/interface'
import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    status: "loading",
    data: null
} as Session

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSession(state, { payload } : { payload: Session, type: string } ) {
        state.data = payload.data
        state.status = payload.status
    },
  },
})

export const sessionActions = counterSlice.actions
export default counterSlice.reducer