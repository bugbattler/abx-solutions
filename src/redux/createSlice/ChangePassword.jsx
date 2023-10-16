import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const ChangePassword = createAsyncThunk(
    "changePassword/user",
    async ({ currentPassword, newPassword, userId, navigate }) => {
        const token = Cookies.get("token");
        try {
            const response = await axios.post(`https://abxsolutions.ca/api/users/password/update`, { currentPassword, newPassword, userId }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            await alert(response?.data?.message+"Please Login Again With New Password!")
            localStorage.clear();
            const cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i];
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            }
            navigate("/");
            return response;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            throw error;
        }
    }
);


const initialState = {
    changePassword: null,
    error: null
}

const updatepassSlice = createSlice({
    name: 'changePassword',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ChangePassword.pending, (state, action) => {
                state.error = null;
            })
            .addCase(ChangePassword.fulfilled, (state, action) => {
                state.changePassword = action.payload;
            })
            .addCase(ChangePassword.rejected, (state, action) => {
                state.error = action.error
            })
    }
})

export default updatepassSlice.reducer;