import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './types';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    }
  },
})

export const {setUserDetails} = userSlice.actions

export default userSlice.reducer