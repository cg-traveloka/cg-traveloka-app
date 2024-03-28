import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAirPortLocations,
  getSeatType,
  selectAirPortLocations,
  selectError,
  selectSearchParams,
  selectSearchResults,
  selectSeatTypes,
  setAirPlaneSearchDTO,
  setError,
  setFlightDetailsDTO,
  setFlightInForShortDescriptions,
  setFromAirPortLocationName,
  setSearchParams,
  setSearchResults,
  setSeatTypeName,
  setSelectToAirPort,
  setSelectedAirport,
  setToAirPortLocationName,
} from "../../redux/features/flightSlice";
import axios from "../../config/privateAxios";
import Calendar from "../utils/Calender";
import { CalendarIcon } from "@mui/x-date-pickers";
import FlightTakeOffIcon from "../icon/FlightTakeOffIcon";
import GuestNumberIcon from "../icon/GuestNumberIcon";
import SeatType from "../icon/SeatType";

import { useNavigate } from "react-router-dom";

import "../../style/scss/flight/_flightSearch.scss";
function Search() {
  const dispatch = useDispatch();
  const airPortLocations = useSelector(selectAirPortLocations);

  const seatTypes = useSelector(selectSeatTypes);
  const searchParams = useSelector(selectSearchParams);
  const searchResults = useSelector(selectSearchResults);
  const dropdownRef = useRef();
  const calendarRef = useRef();
  const [show, setShow] = useState({
    isOpenFrom: false,
    isOpenTo: false,
    showCalendar: false,
  });
  const [form, setForm] = useState({
    selectedCityFrom: "Thành phố Hồ Chí Minh - SGN",
    seatQuantity: 1,
    selectedCityTo: "Thành phố Hà Nội - HAN",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShow({
          isOpenFrom: false,
          isOpenTo: false,
          showCalendar: false,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const navigate = useNavigate();
  const formatAirportLocation = (cityName, airportLocationName) => {
    const airportCode = airportLocationName.substring(
      airportLocationName.length - 4,
      airportLocationName.length - 1
    );
    return `${cityName} - ${airportCode}`;
  };
  const searchFlights = async () => {
    try {
      const response = await axios.post("/api/flights/search", searchParams);
      console.log(response.data);
      console.log("Search" + JSON.stringify(searchParams));
      if (
        response.data &&
        Array.isArray(response.data.flightDetailsDTO) &&
        Array.isArray(response.data.airPlantSearchDTO) &&
        Array.isArray(response.data.flightInForShortDescriptions)
      ) {
        dispatch(setFlightDetailsDTO(response.data.flightDetailsDTO));
        dispatch(setAirPlaneSearchDTO(response.data.airPlantSearchDTO));
        dispatch(
          setFlightInForShortDescriptions(
            response.data.flightInForShortDescriptions
          )
        );
      } else {
        console.error("API response does not contain the required arrays");
      }
      console.log(response.data);
      navigate("/flight-search");
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  // useEffect(() => {
  //   searchFlights();
  // }, []);
  const handleSearch = () => {
    searchFlights();
  };
  useEffect(() => {
    axios
      .get("/api/airport-locations")
      .then((response) => {
        dispatch(getAirPortLocations(response.data));
      })
      .catch((error) => {
        dispatch(setError(error.message));
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/seat-types")
      .then((response) => {
        dispatch(getSeatType(response.data));
      })
      .catch((error) => {
        dispatch(setError(error.message));
      });
  }, [dispatch]);
  const openDropdownFrom = () => {
    setShow((prevShow) => ({
      ...prevShow,
      isOpenFrom: !prevShow.isOpenFrom,
      isOpenTo: false,
    }));
  };

  const openDropdownTo = () => {
    setShow((prevShow) => ({
      ...prevShow,
      isOpenTo: !prevShow.isOpenTo,
      isOpenFrom: false,
    }));
  };
  const handleDateChange = (date) => {
    const parts = date.split("/");
    const localDate = new Date(`${parts[2]}/${parts[1]}/${parts[0]}`);
    const localDateFormatted = localDate.toISOString();
    setForm((prevForm) => ({ ...prevForm, startDate: localDateFormatted }));
    dispatch(
      setSearchParams({ ...searchParams, startDate: localDateFormatted })
    );
    setShow((prevShow) => ({ ...prevShow, showCalendar: false }));
  };

  const handleChange = (field, value, dropdown) => {
    const seatQuantityValue = isNaN(parseInt(value)) ? value : parseInt(value);

    if (searchParams && Object.keys(searchParams).length !== 0) {
      const isFromFilled =
        searchParams.fromAirportLocationId !== null &&
        searchParams.fromAirportLocationId !== undefined &&
        searchParams.toAirportLocationId !== null &&
        searchParams.toAirportLocationId !== undefined;
      if (isFromFilled) {
        console.log("searchParams đã nhận giá trị từ ô input 'from'");
      } else {
        console.log("searchParams chưa nhận giá trị từ ô input 'from'");
      }
    }
    console.log(`Đang thay đổi ${field} với giá trị: ${value}`);

    if (field === "seatTypeId") {
      const selectedSeatType = seatTypes.find(
        (seatType) => String(seatType.id) === String(value)
      );
      dispatch(setSeatTypeName(selectedSeatType ? selectedSeatType.name : ""));
    }

    setForm((prevForm) => ({ ...prevForm, [field]: value }));
    dispatch(setSearchParams({ ...searchParams, [field]: seatQuantityValue }));

    setShow((prevShow) => ({ ...prevShow, [dropdown]: false }));
  };

  const toggleCalendar = () => {
    setShow((prevShow) => ({
      ...prevShow,
      showCalendar: !prevShow.showCalendar,
    }));
  };
  useEffect(() => {
    if (seatTypes.length > 0 && !form.seatTypeId) {
      const initialSeatTypeId = seatTypes[0].id;
      setForm((prevForm) => ({
        ...prevForm,
        seatTypeId: initialSeatTypeId,
      }));
      dispatch(
        setSearchParams({ ...searchParams, seatTypeId: initialSeatTypeId })
      );
    }
  }, [seatTypes, form.seatTypeId, dispatch]);
  return (
    <div className="flight-page-search ">
      <div className="flight-page-search-inner">
        <div className="flight-page-search-inner-box">
          <div className="flight-page-search-inner-box-content-top">
            <div className="flight-page-search-inner-box-content-top-left">
              <p>Đặt vé máy bay</p>
            </div>
            <div className="flight-page-search-inner-box-content-top-right">
              <div className="flight-page-search-inner-box-content-top-right-button">
                Mở bản đồ
              </div>
            </div>
          </div>
          <form>
            <div
              className="flight-page-search-inner-box-content-mid"
              style={{ gap: "3px" }}
            >
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px 20px",
                }}
              >
                <div className="flight-page-search-inner-box-content-mid-from">
                  Từ
                </div>
                <div
                  className="flight-page-search-inner-box-content-mid-from-content"
                  style={{ width: "230px" }}
                >
                  <FlightTakeOffIcon />
                  <div
                    className="flight-page-search-inner-box-content-mid-from-content-input"
                    style={{
                      minWidth: "590px",
                      maxHeight: "500px",
                      overflowY: "scroll",
                    }}
                    onClick={openDropdownFrom}
                  >
                    {form.selectedCityFrom || "Chọn thành phố"}

                    {show.isOpenFrom && (
                      <div className="dropdown" ref={dropdownRef}>
                        {airPortLocations.map((airport) => (
                          <div
                            key={airport.id}
                            onClick={(event) => {
                              event.stopPropagation();

                              handleChange(
                                "fromAirportLocationId",
                                airport.id,
                                "isOpenFrom"
                              );
                              const airportName = formatAirportLocation(
                                airport.cityName,
                                airport.airportLocationName
                              );
                              dispatch(setFromAirPortLocationName(airportName));
                              setForm((prevForm) => ({
                                ...prevForm,
                                selectedCityFrom: airportName,
                              }));
                            }}
                            className="dropdown-option"
                          >
                            <span>{airport.cityName}</span>
                            <small>{airport.airportLocationName}</small>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px 20px",
                }}
              >
                <div className="flight-page-search-inner-box-content-mid-from">
                  Đến
                </div>
                <div
                  className="flight-page-search-inner-box-content-mid-from-content"
                  style={{ width: "230px" }}
                >
                  <FlightTakeOffIcon />

                  <div
                    className="flight-page-search-inner-box-content-mid-from-content-input"
                    style={{
                      minWidth: "590px",
                      maxHeight: "500px",
                      overflowY: "scroll",
                    }}
                    onClick={openDropdownTo}
                  >
                    {form.selectedCityTo || "Chọn thành phố"}

                    {show.isOpenTo && (
                      <div
                        className="dropdown"
                        style={{ marginLeft: "230px" }}
                        ref={dropdownRef}
                      >
                        {airPortLocations.map((airport) => (
                          <div
                            key={airport.id}
                            onClick={(event) => {
                              event.stopPropagation();

                              handleChange(
                                "toAirportLocationId",
                                airport.id,
                                "isOpenTo"
                              );
                              const airportName = formatAirportLocation(
                                airport.cityName,
                                airport.airportLocationName
                              );
                              dispatch(setToAirPortLocationName(airportName));
                              setForm((prevForm) => ({
                                ...prevForm,
                                selectedCityTo: formatAirportLocation(
                                  airport.cityName,
                                  airport.airportLocationName
                                ),
                              }));
                            }}
                            className="dropdown-option"
                          >
                            <span>{airport.cityName}</span>
                            <small>{airport.airportLocationName}</small>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px 9px",
                }}
              >
                <div className="flight-page-search-inner-box-content-mid-from">
                  Số Hành khách
                </div>
                <div
                  className="flight-page-search-inner-box-content-mid-from-content"
                  style={{ width: "230px" }}
                >
                  <GuestNumberIcon />
                  <input
                    className="flight-page-search-inner-box-content-mid-from-content-input "
                    type="text"
                    placeholder="Dari"
                    value={form.seatQuantity}
                    onChange={(event) =>
                      handleChange("seatQuantity", event.target.value, "")
                    }
                  />
                </div>
              </div>
            </div>
            <div
              className="flight-page-search-inner-box-content-mid"
              style={{ gap: "231px" }}
            >
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px 20px",
                }}
              >
                <div className="flight-page-search-inner-box-content-mid-from">
                  Từ
                </div>
                <div
                  className="flight-page-search-inner-box-content-mid-from-content"
                  style={{
                    position: "relative",
                    width: "200px",
                    marginTop: "8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  ref={dropdownRef}
                  onClick={toggleCalendar}
                >
                  <CalendarIcon
                    className="text-gray-500"
                    onClick={toggleCalendar}
                  />

                  <input
                    type="text"
                    name="startDate"
                    value={
                      form.startDate
                        ? new Date(form.startDate).toLocaleDateString("en-GB")
                        : new Date().toLocaleDateString("en-GB")
                    }
                    onChange={(e) => handleDateChange(e.target.value)}
                    style={{ outline: "none" }}
                  />
                </div>
              </div>
              <div
                className=""
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px 0 10px 80px",
                }}
              >
                <div className="flight-page-search-inner-box-content-mid-from">
                  Hạng ghế
                </div>
                <div
                  className="flight-page-search-inner-box-content-mid-from-content"
                  style={{ width: "236px" }}
                >
                  <SeatType />
                  <select
                    className="flight-page-search-inner-box-content-mid-from-content-input"
                    name="seatTypeId"
                    style={{ width: "100%", marginTop: "10px" }}
                    value={form.seatTypeId}
                    onChange={(e) => {
                      handleChange("seatTypeId", e.target.value, "");
                    }}
                  >
                    {seatTypes.map((seatType) => (
                      <option key={seatType.id} value={seatType.id}>
                        {seatType.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="button"
                  className="p-4 mt-4 bg-orange-500 text-white rounded-lg"
                  onClick={handleSearch}
                >
                  Tìm kiếm chuyến bay
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div
        className="absolute border border-solid border-slate-200 rounded-lg bg-white max-w-fit hover:border-sky-300 transition-all duration-300 ease-in-out"
        ref={dropdownRef}
        style={{
          top: "630px",
          left: "400px",
          opacity: show.showCalendar ? 1 : 0,
          transform: show.showCalendar ? "translateY(0)" : "translateY(10px)",
        }}
      >
        <Calendar date={handleDateChange} />
      </div>
    </div>
  );
}

export default Search;
