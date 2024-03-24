import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  hotelName: null,
  flightNameFromCity: null,
  flightNameToCity: null,
  status: null,
  bookings: [],
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action) => {
      state.bookings = action.payload;
    },
    changeHotelName: (state, action) => {
      state.hotelName = action.payload;
    },
    changeFlightNameFromCity: (state, action) => {
      state.flightNameFromCity = action.payload;
    },
    changeFlightNameToCity: (state, action) => {
      state.flightNameToCity = action.payload;
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const {
  changeHotelName,
  changeFlightNameFromCity,
  changeFlightNameToCity,
  changeStatus,
  setBooking,
} = bookingSlice.actions;
export const selectBooking = (state) => state.booking;
export default bookingSlice.reducer;
