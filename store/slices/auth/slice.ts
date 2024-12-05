import { IAccount } from "@/dto/account";
import { ILoginResponse } from "@/dto/auth";
import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  authData: ILoginResponse | undefined;
}

const initialState: State = {
  authData: undefined,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<ILoginResponse | undefined>) => {
      state.authData = action.payload;
    },
    setAccountData: (state, action: PayloadAction<IAccount>) => {
      state.authData!.account = action.payload;
    },
  },
});

export const { setAuthData, setAccountData } = slice.actions;

export const selectAccountData = (state: RootState) =>
  state.auth.authData?.account || undefined;

export const selectAccessToken = (state: RootState) =>
  state.auth.authData?.accessToken || undefined;

const authReducer = slice.reducer;

export default authReducer;
