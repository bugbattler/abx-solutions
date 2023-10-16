import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const GetSingleShip = createAsyncThunk(
    "getSingleShip/Ships",
    async ({ ship_id, transId }) => {
        const token = Cookies.get("token");
        console.log(transId, 10);
        try {
            if (ship_id) {
                const response = await axios.get(`https://abxsolutions.ca/api/users/ship/getSingle/${ship_id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        transId: transId
                    }
                });
                console.log(response?.data);
                return response.data;
            } else {
                const response = await axios.get(`https://abxsolutions.ca/api/users/ship/getSingle`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        transId: transId
                    }
                });
                console.log(response?.data);
                return response.data;
            }
        } catch (error) {
            toast.error(error.response.data.error);
            throw error;
        }
    }
);


const initialState = {
    getSingleShip: null,
    error: null,
    loading: true
}

const getSingleShipSlice = createSlice({
    name: 'getSingleShip',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(GetSingleShip.pending, (state, action) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(GetSingleShip.fulfilled, (state, action) => {
                state.getSingleShip = action.payload;
                state.loading = false;
            })
            .addCase(GetSingleShip.rejected, (state, action) => {
                state.error = action.error
                state.loading = false;
            })
    }
})

export default getSingleShipSlice.reducer;