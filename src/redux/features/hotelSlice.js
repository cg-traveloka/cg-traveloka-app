import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  startDate: null,
  endDate: null,
  sort: "",
};
export const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    changeHotelId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { changeHotelId } = hotelSlice.actions;
export const selectHotel = (state) => state.hotel;
export default hotelSlice.reducer;
