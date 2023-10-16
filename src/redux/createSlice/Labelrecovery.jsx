import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const labelrecoveryThunk = createAsyncThunk("labelRecovery/makeShipment", async (data) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(`https://abxsolutions.ca/api/ups/labelRecovery`, data, {
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

const labelRecoverySlice = createSlice({
  name: "labelRecovery",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(labelrecoveryThunk.pending, (state, action) => {
        state.error = null;
      })
      .addCase(labelrecoveryThunk.fulfilled, (state, action) => {
        state.shipment = action.payload;
      })
      .addCase(labelrecoveryThunk.rejected, (state, action) => {
        state.error = action.error;
      });
  }
});

export default labelRecoverySlice.reducer;