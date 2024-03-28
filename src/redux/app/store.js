import { configureStore } from "@reduxjs/toolkit";
import hotelReducer from "../features/hotelSlice";
import userReducer from "../features/userSlice";
import modalReducer from "../features/modalSlice";
import hotelsReducer from "../features/hotelsSlice";

import flightReducer from "../features/flightSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    hotel: hotelReducer,
    modal: modalReducer,
    flight: flightReducer,
    hotels: hotelsReducer,
  },
});

export default store;
