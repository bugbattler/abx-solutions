import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const quotegeneration = createAsyncThunk("quote/Generatequote", async (data) => {
    const token = Cookies.get("token");
    try {
        const response = await axios.post(`https://abxsolutions.ca/api/ups/generatQuotation`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        toast.success("Quote Generated Succefully!")
        return response;
    } catch (error) {
        toast.error(error?.response?.data?.response?.errors[0]?.message);
        throw error;
    }
})

const initialState = {
    quotegen: "",
    error: null
}

const quoteGenerationSlice = createSlice({
    name: "quote",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(quotegeneration.pending, (state, action) => {
                state.error = null
            })
            .addCase(quotegeneration.fulfilled, (state, action) => {
                state.quotegen = action.payload;
            })
            .addCase(quotegeneration.rejected, (state, action) => {
                state.error = action.error;
            })
    }
})

export default quoteGenerationSlice.reducer;