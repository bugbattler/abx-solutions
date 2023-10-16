import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const GetSingleQuotation = createAsyncThunk(
    "getSingleQuotation/Quots",
    async (id) => {
        const token = Cookies.get("token");        
        try {
            const response = await axios.get(`https://abxsolutions.ca/api/users/quotation/getSingle/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
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
    getSingleQuotation: null,
    error: null,
    loading:true
}

const getSingleQuotationSlice = createSlice({
    name: 'getSingleQuotation',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetSingleQuotation.pending, (state, action) => {
                state.error = null;
                state.loading=true;
            })
            .addCase(GetSingleQuotation.fulfilled, (state, action) => {
                state.getSingleQuotation = action.payload;
                state.loading=false;
            })
            .addCase(GetSingleQuotation.rejected, (state, action) => {
                state.error = action.error
                state.loading=false;
            })
    }
})

export default getSingleQuotationSlice.reducer;