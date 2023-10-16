import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const upShipperInfo= createAsyncThunk(
    "shipperInfo/ShipmentInfo",
    async (value) => {
        const token = Cookies.get("token");
        try {
            const response = await axios.post(`https://abxsolutions.ca/api/users/shipperInfo`, value, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            toast.success(response?.data?.message);
            return response;
        } catch (error) {
            toast.error(error?.response?.data?.error);
            throw error;
        }
    }
);


const initialState = {
    shipperInfo: null,
    error: null
}

const upShipperSlice = createSlice({
    name: 'shipperInfo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(upShipperInfo.pending, (state, action) => {
                state.error = null;
            })
            .addCase(upShipperInfo.fulfilled, (state, action) => {
                state.shipperInfo = action.payload;
            })
            .addCase(upShipperInfo.rejected, (state, action) => {
                state.error = action.error
            })
    }
})

export default upShipperSlice.reducer;