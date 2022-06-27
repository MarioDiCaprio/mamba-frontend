import { configureStore } from "@reduxjs/toolkit";
import loginCredentialsSlice from "./slices/loginCredentialsSlice";

export const store = configureStore({
    reducer: {
        loginCredentials: loginCredentialsSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
