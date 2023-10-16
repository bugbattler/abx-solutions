import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const getAllShipsConfirmed = createAsyncThunk(
    "getShipConfirm/Ships",
    async ({ pageNo, limit, fromDate, toDate }) => {
        const token = Cookies.get("token");
        try {
            const response = await axios.get(`https://abxsolutions.ca/api/users/confirmedShips/getByUser`, {
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
            console.log(error);
            toast.error(error.response.data.error);
            throw error;
        }
    }
);


const initialState = {
    getShipConfirm: null,
    error: null,
    loading: true
}

const getAllConfirmedShipsSlice = createSlice({
    name: 'getShipConfirm',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllShipsConfirmed.pending, (state, action) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(getAllShipsConfirmed.fulfilled, (state, action) => {
                state.getShip = action.payload;
                state.loading = false;
            })
            .addCase(getAllShipsConfirmed.rejected, (state, action) => {
                state.error = action.error
                state.loading = false;
            })
    }
})

export default getAllConfirmedShipsSlice.reducer;