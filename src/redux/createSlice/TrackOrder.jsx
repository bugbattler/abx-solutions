import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const Trackorder = createAsyncThunk(
    "track/trackOrder",
    async (ship_id) => {
        const token = Cookies.get("token");        
        try {
            const response = await axios.get(`https://abxsolutions.ca/api/ups/trackShipment/${ship_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.response?.errors[0]?.message);
            throw error;
        }
    }
);


const initialState = {
    track: null,
    error: false,
    loading:true
}

const trackOrderSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Trackorder.pending, (state, action) => {
                state.error = false;
                state.loading=true;
            })
            .addCase(Trackorder.fulfilled, (state, action) => {
                state.track = action.payload;
                state.loading=false;
            })
            .addCase(Trackorder.rejected, (state, action) => {
                state.error = true;
                state.loading=false;
            })
    }
})

export default trackOrderSlice.reducer;