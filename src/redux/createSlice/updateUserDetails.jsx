import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const upUserInfo = createAsyncThunk(
    "updateUserInfo/Users",
    async (value) => {
        const token = Cookies.get("token");
        const user = JSON.parse(JSON.parse(Cookies.get("user")));
        const id = user?.id;
        try {
            const response = await axios.post(`https://abxsolutions.ca/api/users/getuser/update/${id}`, value, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            toast.success(response?.data?.message);
            return response;
        } catch (error) {
            toast.error(error?.response?.data?.message)
            throw error;
        }
    }
);


const initialState = {
    updateUserInfo: null,
    error: null
}

const upUserSlice = createSlice({
    name: 'updateUserInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(upUserInfo.pending, (state, action) => {
                state.error = null;
            })
            .addCase(upUserInfo.fulfilled, (state, action) => {
                state.updateUserInfo = action.payload;
            })
            .addCase(upUserInfo.rejected, (state, action) => {
                state.error = action.error
            })
    }
})

export default upUserSlice.reducer;