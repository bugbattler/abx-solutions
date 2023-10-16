import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const getAllsavedQuoatations = createAsyncThunk(
    "getQuotations/savedQuotaions",
    async ({ pageNo, limit, fromDate, toDate }) => {
        const token = Cookies.get("token");
        try {
            const response = await axios.get(`https://abxsolutions.ca/api/users/quotation/getByUser`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    pageNo: pageNo,
                    limit: limit,
                    fromDate: fromDate,
                    toDate: toDate
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
    getQuotations: null,
    error: null,
    loading: true
}

const getAllQuotationsSlice = createSlice({
    name: 'getQuotations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllsavedQuoatations.pending, (state, action) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(getAllsavedQuoatations.fulfilled, (state, action) => {
                state.getQuotations = action.payload;
                state.loading = false;
            })
            .addCase(getAllsavedQuoatations.rejected, (state, action) => {
                state.error = action.error
                state.loading = false;
            })
    }
})

export default getAllQuotationsSlice.reducer;