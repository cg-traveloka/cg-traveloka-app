import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "../features/hotelSlice";
import userReducer from "../features/userSlice";
import modalReducer from "../features/modalSlice";
import customerReducer from "../features/customerSlice";
import bookingReducer from "../features/bookingSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    hotel: hotelReducer,
    modal: modalReducer,
    customer: customerReducer,
    booking: bookingReducer,
  },
});
export default store;
