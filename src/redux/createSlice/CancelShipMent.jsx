import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const CancelShipment = createAsyncThunk(
    "cancelShip/Ships",
    async (shipment_id) => {
        const token = Cookies.get("token");
        try {
            const response = await axios.get(`https://abxsolutions.ca/api/ups/cancelShipment/${shipment_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            toast.success("Shipment cancelled successfully!");
            return response.data;
        } catch (error) {
            toast.error(error?.response.data.response.errors[0].message);
            throw error;
        }
    }
);


const initialState = {
    cancelShip: null,
    error: null,
    loading:true
}

const cancelShipmentSlice = createSlice({
    name: 'cancelShip',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CancelShipment.pending, (state, action) => {
                state.error = null;
                state.loading=true;
            })
            .addCase(CancelShipment.fulfilled, (state, action) => {
                state.cancelShip = action.payload;
                state.loading=false;
            })
            .addCase(CancelShipment.rejected, (state, action) => {
                state.error = action.error
                state.loading=false;
            })
    }
})

export default cancelShipmentSlice.reducer;