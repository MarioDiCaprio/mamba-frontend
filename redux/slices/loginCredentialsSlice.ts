import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { LoginRequest } from "../../graphql/types";


const cookies = new Cookies();
let initialState: LoginRequest = cookies.get('loginCredentials');
if (initialState === null || initialState === undefined) {
    initialState = { username: null, password: null }
}

export const loginCredentialsSlice = createSlice({
    name: 'loginCredentials',
    initialState,
    reducers: {
        setLoginCredentials: (_state, request: PayloadAction<LoginRequest & { remember?: boolean }>) => {
            if (request.payload.remember) {
                const data: LoginRequest = {
                    username: request.payload.username,
                    password: request.payload.password
                };
                cookies.set('loginCredentials', data, { sameSite: 'strict' });
            }
            return request.payload;
        }
    }
});

export const { setLoginCredentials } = loginCredentialsSlice.actions;

export default loginCredentialsSlice.reducer;
