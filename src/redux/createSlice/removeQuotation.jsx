import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const RemoveQuotation = createAsyncThunk(
    "removeQuotation/Quots",
    async ({id}) => {
        const token = Cookies.get("token");
        console.log(id);
        try {
            const response = await axios.post(`https://abxsolutions.ca/api/users/order/delete/order`, { id }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            toast.success("Deleted Successfully!");
            return response.data;
        } catch (error) {
            toast.error(error.response.data.error);
            throw error;
        }
    }
);


const initialState = {
    removeQuotation: null,
    error: null,
    loading: true
}

const removeQuotationSlice = createSlice({
    name: 'removeQuotation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(RemoveQuotation.pending, (state, action) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(RemoveQuotation.fulfilled, (state, action) => {
                state.removeQuotation = action.payload;
                state.loading = false;
            })
            .addCase(RemoveQuotation.rejected, (state, action) => {
                state.error = action.error
                state.loading = false;
            })
    }
})

export default removeQuotationSlice.reducer;