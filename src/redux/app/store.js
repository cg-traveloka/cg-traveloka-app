import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "../features/hotelSlice";
import userReducer from "../features/userSlice";
import modalReducer from "../features/modalSlice";
import hotelsReducer from "../features/hotelsSlice";
import flightReducer from "../features/flightSlice";
import customerReducer from "../features/customerSlice";
import bookingReducer from "../features/bookingSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    hotel: hotelReducer,
    modal: modalReducer,
    flight: flightReducer,
    hotels: hotelsReducer,
    customer: customerReducer,
    booking: bookingReducer,
    hotels: hotelsReducer
  },
});

export default store;
