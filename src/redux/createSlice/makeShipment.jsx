import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const makeShipment1 = createAsyncThunk("shipment/makeShipment", async (data) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(`https://abxsolutions.ca/api/ups/makeShipment`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response;
  } catch (error) {
    toast.error(error?.response?.data?.response?.errors[0]?.message);
    throw error;
  }
});

const initialState = {
  shipment: "",
  error: null
};

const makeShipmentSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeShipment1.pending, (state, action) => {
        state.error = null;
      })
      .addCase(makeShipment1.fulfilled, (state, action) => {
        state.shipment = action.payload;
      })
      .addCase(makeShipment1.rejected, (state, action) => {
        state.error = action.error;
      });
  }
});

export default makeShipmentSlice.reducer;
