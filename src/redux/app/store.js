import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "../features/hotelSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        hotel: hotelReducer
    }
})

export default store;