import type { PayloadAction } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: any;
  isAuthorized: boolean;
  userId: string;
  isArtist: boolean;
  profile: string;
  ticket: any;
  isArtProvider: string;
}

const initialState: UserState = {
  user: null,
  isAuthorized: false,
  userId: "",
  isArtist: false,
  profile: "user",
  ticket: null,
  isArtProvider: "",
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
    setIsArtist: (state, action: PayloadAction<boolean>) => {
      state.isArtist = action.payload;
    },
    setProfile: (state, action: PayloadAction<any>) => {
      state.profile = action.payload;
    },
    setTicket: (state, action: PayloadAction<any>) => {
      state.ticket = action.payload;
    },
    setIsArtProvider: (state, action: PayloadAction<any>) => {
      state.isArtProvider = action.payload;
    },
  },
});

export const {
  updateUser,
  setIsAuthorized,
  removeUser,
  forgotPasswordUserId,
  setIsArtist,
  setProfile,
  setTicket,
  setIsArtProvider,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
