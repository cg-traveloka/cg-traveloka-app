import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  airPortLocations: [],
  seatTypes: [],
  error: null,
  searchParams: {
    fromAirportLocationId: null,
    toAirportLocationId: null,
    startDate: null,
    airPlantBrandId: null,
    seatTypeId: null,
    seatQuantity: null,
    sortBy: "startTime",
    order: "asc",
    durationFrom: 0,
    durationTo: null,
    priceFrom: 0,
    priceTo: null,
    page: 0,
  },
  searchResults: [],
  flightDetailsDTO: [],
  airPlantSearchDTO: [],
  flightInForShortDescriptions: [],

  flightInformation: null,
};

export const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    getAirPortLocations: (state, action) => {
      state.airPortLocations = action.payload;
    },
    getSeatType: (state, action) => {
      state.seatTypes = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setFlightInformation: (state, action) => {
      state.flightInformation = action.payload;
    },
    setFlightDetailsDTO: (state, action) => {
      state.flightDetailsDTO = action.payload;
    },
    setAirPlaneSearchDTO: (state, action) => {
      state.airPlantSearchDTO = action.payload;
    },
    setFlightInForShortDescriptions: (state, action) => {
      state.flightInForShortDescriptions = action.payload;
    },
  },
});
export const {
  getAirPortLocations,
  getSeatType,
  setError,
  setSearchParams,
  setSearchResults,
  setFlightInformation,
  setFlightDetailsDTO,
  setAirPlaneSearchDTO,
  setFlightInForShortDescriptions,
} = flightSlice.actions;

export const selectAirPortLocations = (state) => state.flight.airPortLocations;
export const selectSeatTypes = (state) => state.flight.seatTypes;
export const selectError = (state) => state.flight.error;
export const selectSearchParams = (state) => state.flight.searchParams;
export const selectSearchResults = (state) => state.flight.searchResults;
export const selectFlightInformation = (state) =>
  state.flight.flightInformation;
export const selectFlightDetailsDTO = (state) => state.flight.flightDetailsDTO;
export const selectAirPlaneSearchDTO = (state) =>
  state.flight.airPlantSearchDTO;
export const selectFlightInforShortDescriptions = (state) =>
  state.flight.flightInForShortDescriptions;
export default flightSlice.reducer;
