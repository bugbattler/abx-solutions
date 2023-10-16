import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const getQuoteAsync = createAsyncThunk(
    "getQuote/savedQuotaions",
    async (data) => {
        const token = Cookies.get("token");
        try {
            const response = await axios.post(`https://abxsolutions.ca/api/ups/getquot`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
            console.log(response?.data);
            return response.data;
        } catch (error) {
            toast.error(error.response.data.error);
            throw error;
        }
    }
);


const initialState = {
    getQuote: null,
    error: null,
    loading: true
}

const getQuoteSlice = createSlice({
    name: 'getQuote',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getQuoteAsync.pending, (state, action) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(getQuoteAsync.fulfilled, (state, action) => {
                state.getQuotations = action.payload;
                state.loading = false;
            })
            .addCase(getQuoteAsync.rejected, (state, action) => {
                state.error = action.error
                state.loading = false;
            })
    }
})

export default getQuoteSlice.reducer;
