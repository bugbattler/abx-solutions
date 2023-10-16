import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const getAllShips = createAsyncThunk(
    "getShip/Ships",
    async ({ pageNo, limit, fromDate, toDate }) => {
        const token = Cookies.get("token");
        try {
            const response = await axios.get(`https://abxsolutions.ca/api/users/ship/getByuser`, {
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
    getShip: null,
    error: null,
    loading: true
}

const getAllShipsSlice = createSlice({
    name: 'getShip',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllShips.pending, (state, action) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(getAllShips.fulfilled, (state, action) => {
                state.getShip = action.payload;
                state.loading = false;
            })
            .addCase(getAllShips.rejected, (state, action) => {
                state.error = action.error
                state.loading = false;
            })
    }
})

export default getAllShipsSlice.reducer;