import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const saveQuotaion = createAsyncThunk("quotesave/SaveQuotationGenerated", async (data) => {
    const token = Cookies.get("token");
    try {
        const response = await axios.post(`https://abxsolutions.ca/api/ups/saveQuotation`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        toast.success("Quote Saved Succefully!")
        return response;
    } catch (error) {
        toast.error(error?.response?.data?.response?.errors[0]?.message);
        throw error;
    }
})

const initialState = {
    quotesave: "",
    error: null
}

const quoteSaveSlice = createSlice({
    name: "quotesave",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveQuotaion.pending, (state, task) => {
                state.error = null
            })
            .addCase(saveQuotaion.fulfilled, (state, action) => {
                state.quotesave = action.payload;
            })
            .addCase(saveQuotaion.rejected, (state, action) => {
                state.error = action.error;
            })
    }
})

export default quoteSaveSlice.reducer;