import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const registration = createAsyncThunk(
    "user/Registration",
    async ({ firstname, lastname, email, username, mobile, org_name, password }) => {
        try {
            const response = await axios.post(`https://abxsolutions.ca/api/users/register`, {
                firstname,
                lastname,
                email,
                mobile,
                org_name,
                password
            });
            return response;
        } catch (error) {
            toast.error(error.response.data.error);
            throw error;
        }
    }
);


const initialState = {
    user: null,
    error: null,
    reg: false
}

const registerSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registration.pending, (state, action) => {
                state.error = null;
            })
            .addCase(registration.fulfilled, (state, action) => {
                state.user = action.payload;
                state.reg = true;

            })
            .addCase(registration.rejected, (state, action) => {
                state.error = action.error
            })
    }
})

export default registerSlice.reducer;