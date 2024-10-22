import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: any;
  isAuthorized: boolean;
  userId: string;
}

const initialState: UserState = {
  user: null,
  isAuthorized: false,
  userId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<any>) => {
      state.user = { ...state.user, ...action.payload };
    },
    removeUser: (state) => {
      state.user = null;
    },

    forgotPasswordUserId: (state, action: PayloadAction<any>) => {
      state.userId = action.payload.userId;
    },
    setIsAuthorized: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },
  },
});

export const { updateUser, setIsAuthorized, removeUser, forgotPasswordUserId } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
