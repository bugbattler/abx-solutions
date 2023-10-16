import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const calculateExpirationDate = () => {
    const expirationDate = new Date();
    // expirationDate.setMinutes(expirationDate.getMinutes() + 2);
    expirationDate.setDate(expirationDate.getDate() + 1);
    return expirationDate;
};

export const UserLogin = createAsyncThunk("login/fetchUserLogin", async ({ email, password }) => {
    try {
        const response = await axios.post(`https://abxsolutions.ca/api/users/login`, { email, password })
        let data = JSON.stringify(response.data.data);
        let token = response.data.token;
        const expirationDate = calculateExpirationDate();
        Cookies.set("token", token, { expires: expirationDate });
        Cookies.set("user", JSON.stringify(data), { expires: expirationDate });
        return response;
    } catch (error) {
        throw error;
    }
})

const initialState = {
    isAuthenticated: false,
    userLog: null,
    error: null,
    isLoading: false
}

const LoginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(UserLogin.pending, (state, action) => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(UserLogin.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.userLog = action.payload;
                state.isLoading = false;
            })
            .addCase(UserLogin.rejected, (state, action) => {
                state.error = action.error
                state.isAuthenticated = false;
                state.isLoading = false;
            })
    }
})

export default LoginSlice.reducer;