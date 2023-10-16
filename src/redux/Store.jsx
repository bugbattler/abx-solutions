import { configureStore } from "@reduxjs/toolkit";
import resgisterReducer from "./createSlice/Userregistration";
import LoginReducer from "./createSlice/LoginSlice";
import addValidationReducer from "./createSlice/AddressValidation";
import quoteGenerationSlice from "./createSlice/Quotegeneration";
import quoteSaveReducer from "./createSlice/SaveQuotation";
import makeShipmentReducer from "./createSlice/makeShipment";
import getUserReducer from "./createSlice/getSingleUser";
import upUserReducer from "./createSlice/updateUserDetails";
import upShipperReducer from "./createSlice/ShipperInfo";
import updatepassReducer from "./createSlice/ChangePassword";
import getAllShipsReducer from "./createSlice/GetShips";
import getSingleShipReducer from "./createSlice/GetSingleShip";
import cancelShipmentReducer from "./createSlice/CancelShipMent";
import trackOrderReducer from "./createSlice/TrackOrder";
import getAllQuotationsReducer from "./createSlice/getSavedQuotations";
import getSingleQuotationReducer from "./createSlice/SingleQuotation";
import removeQuotationReducer from "./createSlice/removeQuotation";
import transactionReducer from "./createSlice/Transaction";
import confirmOrderSlice from "./createSlice/ConfirmOrder";
import getAllConfirmedShipsSlice from "./createSlice/ConfirmedShips"
import labelRecoverySlice from "./createSlice/Labelrecovery";
import getQuoteSlice from "./createSlice/getQuote";
import getShipperDetailsSlices from "./createSlice/Shipper";

const store = configureStore({
    reducer: {
        user: resgisterReducer,
        login: LoginReducer,
        address: addValidationReducer,
        quote: quoteGenerationSlice,
        quotesave: quoteSaveReducer,
        shipment: makeShipmentReducer,
        getUser: getUserReducer,
        updateUserInfo: upUserReducer,
        shipperInfo: upShipperReducer,
        changePassword: updatepassReducer,
        getShip: getAllShipsReducer,
        singleShip: getSingleShipReducer,
        cancelShip: cancelShipmentReducer,
        track: trackOrderReducer,
        getQuotations: getAllQuotationsReducer,
        getSingleQuotation: getSingleQuotationReducer,
        removeQuotation: removeQuotationReducer,
        transaction: transactionReducer,
        confirmOrder: confirmOrderSlice,
        getShipConfirm: getAllConfirmedShipsSlice,
        labelRecovery: labelRecoverySlice,
        getQuote: getQuoteSlice,
        shippersInfo: getShipperDetailsSlices
    }
})

export default store;