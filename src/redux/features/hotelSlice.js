import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    startDate: null,
    endDate: null,
    cityId: 30,
    sort: ""
};
export const hotelSlice = createSlice({
    name: "hotel",
    initialState,
    reducers: {
        changeHotelId: (state, action) => {
            state.id = action.payload
        },
        changeCityId: (state, action) => {
            state.cityId = action.payload
        }
    }
});

export const { changeHotelId, changeCityId } = hotelSlice.actions
export const selectHotel = (state) => state.hotel;
export default hotelSlice.reducer;
