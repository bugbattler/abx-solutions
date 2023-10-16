import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const addressValidation = createAsyncThunk("address/ValidateAddress", async ({
    ConsigneeName, BuildingName, AddressLine, Region, PoliticalDivision2, PoliticalDivision1, PostcodePrimaryLow, PostcodeExtendedLow, Urbanization, CountryCode
}) => {
    try {
        const response = await axios.post(`https://abxsolutions.ca/api/ups/addressValidation`, {
            ConsigneeName, BuildingName, AddressLine, Region, PoliticalDivision2, PoliticalDivision1, PostcodePrimaryLow, PostcodeExtendedLow, Urbanization, CountryCode
        })
        toast.success("Validation Successfull!")
        return response;
    } catch (error) {
        toast.error(error.response.data.response.errors[0].message);
    }
})

const initialState = {
    addressValid: "",
    error: null,
    validation: false
}

const addValidationSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addressValidation.pending, (state, task) => {
                state.error = null
                state.validation = false
            })
            .addCase(addressValidation.fulfilled, (state, action) => {
                state.addressValid = action.payload;
                state.validation = true
            })
            .addCase(addressValidation.rejected, (state, action) => {
                state.error = action.error;
            })
    }
})

export default addValidationSlice.reducer;