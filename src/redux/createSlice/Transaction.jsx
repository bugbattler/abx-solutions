import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const Transaction = createAsyncThunk(
    "transaction/transactionOrder",
    async ({ amount, ship_id }) => {
        const token = Cookies.get("token");
        amount = -amount;
        try {
            const response = await axios.post(`https://abxsolutions.ca/api/users/ship/transaction`, { amount, ship_id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            throw error;
        }
    }
);


const initialState = {
    transaction: null,
    error: false,
    loading: true
}

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Transaction.pending, (state, action) => {
                state.error = false;
                state.loading = true;
            })
            .addCase(Transaction.fulfilled, (state, action) => {
                state.track = action.payload;
                state.loading = false;
            })
            .addCase(Transaction.rejected, (state, action) => {
                state.error = true;
                state.loading = false;
            })
    }
})

export default transactionSlice.reducer;