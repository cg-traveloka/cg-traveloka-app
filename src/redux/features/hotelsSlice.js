import { createSlice } from "@reduxjs/toolkit";

const initialState = {hotels:[]};
export const hotelsSlice = createSlice({
    name: "hotels",
    initialState,
    reducers: {
        changeHotels:(state,action)=>{
            state.hotels = action.payload;
        }
    }
});

export const { changeHotels } = hotelsSlice.actions
export const selectHotels = (state) => state.hotels;
export default hotelsSlice.reducer;