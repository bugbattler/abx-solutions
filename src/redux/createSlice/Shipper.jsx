import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const getShipperDetailsThunk = createAsyncThunk(
    "shippersInfo/GetShipperInfo",
    async () => {
        const token = Cookies.get("token");
        try {
            const response = await axios.get(`https://abxsolutions.ca/api/users/getShippers`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log(response?.data?.data);
            return response;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);


const initialState = {
    shippersInfo: null,
    error: null
}

const getShipperDetailsSlices = createSlice({
    name: 'shippersInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getShipperDetailsThunk.pending, (state, action) => {
                state.error = null;
            })
            .addCase(getShipperDetailsThunk.fulfilled, (state, action) => {
                state.shippersInfo = action.payload;
            })
            .addCase(getShipperDetailsThunk.rejected, (state, action) => {
                state.error = action.error;
            })
    }
})

export default getShipperDetailsSlices.reducer;