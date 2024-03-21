import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "../features/hotelSlice";
import userReducer from "../features/userSlice";
import modalReducer from "../features/modalSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        hotel: hotelReducer,
        modal: modalReducer
    }
})

export default store;