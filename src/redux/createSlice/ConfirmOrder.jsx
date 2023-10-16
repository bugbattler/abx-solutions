import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const confirmOrderThunk = createAsyncThunk(
    "confirmOrder/Ships",
    async ({id}) => {
        const token = Cookies.get("token");
        console.log(id)
        try {
            const response = await axios.post(`https://abxsolutions.ca/api/ups/confirm/ship`,{id},
             {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            toast.success("Order Placed Successfully!");
            return response.data;
        } catch (error) {
            toast.error(error?.response.data.response.errors[0].message);
            throw error;
        }
    }
);


const initialState = {
    confirmOrder: null,
    error: null,
    loading:true
}

const confirmOrderSlice = createSlice({
    name: 'confirmOrder',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(confirmOrderThunk.pending, (state, action) => {
                state.error = null;
                state.loading=true;
            })
            .addCase(confirmOrderThunk.fulfilled, (state, action) => {
                state.confirmOrder = action.payload;
                state.loading=false;
            })
            .addCase(confirmOrderThunk.rejected, (state, action) => {
                state.error = action.error
                state.loading=false;
            })
    }
})

export default confirmOrderSlice.reducer;