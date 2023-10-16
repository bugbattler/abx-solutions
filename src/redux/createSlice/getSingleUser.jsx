import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const getUserInfo = createAsyncThunk(
    "getUser/GetUser",
    async () => {
        const token = Cookies.get("token");
        const user = JSON.parse(JSON.parse(Cookies.get("user")));
        const id = user?.id;
        try {
            const response = await axios.get(`https://abxsolutions.ca/api/users/getuser/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            toast.error(error.response.data.error);
            throw error;
        }
    }
);


const initialState = {
    getUser: null,
    error: null,
    loading:true
}

const getUserSlice = createSlice({
    name: 'getUser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserInfo.pending, (state, action) => {
                state.error = null;
                state.loading=true;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.getUser = action.payload;
                state.loading=false;
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.error = action.error
                state.loading=false;
            })
    }
})

export default getUserSlice.reducer;