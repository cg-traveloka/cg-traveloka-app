import React, { useEffect, useRef, useState } from "react";
import SystemToolSortIcon from "../icon/SystemToolSortIcon";
import ArrowDownIcon from "../icon/ArrowDownIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFlightDetailsDTO,
  selectFlightInforShortDescriptions,
  selectSearchParams,
  setFlightDetailsDTO,
  setSearchParams,
} from "../../redux/features/flightSlice";
import axios from "../../config/privateAxios";

function FlightSort() {
  const popupRef = useRef(null);

  const dispatch = useDispatch();
  const [clickCount, setClickCount] = useState({});

  const searchParams = useSelector(selectSearchParams);
  const flightDetailsDTO = useSelector(selectFlightDetailsDTO);
  const initialFlightDetails = useRef(flightDetailsDTO);

  useEffect(() => {
    if (initialFlightDetails.current === null) {
      initialFlightDetails.current = flightDetailsDTO;
    }
  }, [flightDetailsDTO]);
  const flightInforShortDescription = useSelector(
    selectFlightInforShortDescriptions
  );
  const sortFlights = (property, order) => {
    const updatedSearchParams = {
      ...searchParams,
      sortBy: property,
      order: order,
    };
    dispatch(setSearchParams(updatedSearchParams));
    searchFlights();
  };

  const sortFlightsByTimeInterval = (flights) => {
    const copyOfFlights = flights.slice();
    return copyOfFlights.sort((a, b) => a.timeInterval - b.timeInterval);
  };

  const handleClick = (index) => {
    setClickCount((prevState) => {
      const newClickCount = (prevState[index] || 0) + 1;
      return {
        ...prevState,
        [index]: newClickCount,
      };
    });
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    Object.keys(clickCount).forEach((index) => {
      if (clickCount[index] % 2 === 1) {
        if (flightInforShortDescription[index].name === "Gía thấp nhất") {
          sortFlights("unitPrice", "asc");
        } else if (
          flightInforShortDescription[index].name === "Thời gian bay ngắn nhất"
        ) {
          const sortedFlights = sortFlightsByTimeInterval(flightDetailsDTO);
          dispatch(setFlightDetailsDTO(sortedFlights));
        } else {
        }
      } else {
        resetFlightDetails();
      }
    });
  }, [clickCount]);
  const handlePopupClick = (sortType) => {
    if (sortType === "Cất cánh sớm nhất" || sortType === "Cất cánh muộn nhất") {
      sortFlights(
        "startTime",
        sortType === "Cất cánh sớm nhất" ? "asc" : "desc"
      );
    } else if (
      sortType === "Hạ cánh sớm nhất" ||
      sortType === "Hạ cánh muộn nhất"
    ) {
      sortFlights("endTime", sortType === "Hạ cánh sớm nhất" ? "asc" : "desc");
    }
    setShowPopup(false);
  };
  const searchFlights = () => {
    axios
      .post("/api/flights/search/filter", searchParams)
      .then((response) => {
        if (response.data && Array.isArray(response.data.flights)) {
          dispatch(setFlightDetailsDTO(response.data.flights));
          console.log(searchParams);

          console.log(response.data);
        } else {
          console.error("API response does not contain the required array");
        }
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi gọi API:", error);
      });
  };
  const resetFlightDetails = () => {
    dispatch(setFlightDetailsDTO(initialFlightDetails.current));
  };
  const [isActive, setIsActive] = useState({
    div1: false,
    div2: false,
    div3: false,
  });
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div
      className="container"
      style={{
        height: "100px",
      }}
    >
      <div
        className="flex h-16 items-center  gap-2 border-b mr-4 border-solid border-slate-300 rounded-lg text-sm"
        style={{ width: "90%" }}
      >
        {flightInforShortDescription.map((item, index) => (
          <div
            key={index}
            className={`w-1/3 text-center py-1 hover:border-blue-300 hover:border-2 hover:cursor-pointer hover:border-solid rounded-lg hover:bg-sky-100 
      ${isActive[`div${index}`] ? "bg-slate-100" : ""}`}
            onClick={() => {
              setIsActive({ [`div${index}`]: !isActive[`div${index}`] });
              setShowPopup(false);
              handleClick(index);
            }}
          >
            <p style={{ color: "rgb(1, 148, 243)" }}>{item.name}</p>
            <p className="text-xs" style={{ color: "rgb(104, 113, 118)" }}>
              {item.unitPrice} VNĐ
            </p>
          </div>
        ))}

        <div
          className={`text-center w-1/3 flex justify-center gap-4 items-center py-1 mr-4 hover:border-sky-300 hover:border-2 hover:cursor-pointer hover:border-solid  rounded-lg hover:bg-sky-100
         ${isActive.div3 ? "bg-slate-100" : ""}`}
          onClick={() => {
            setIsActive({ div3: !isActive.div3 });
            setShowPopup(!showPopup);
          }}
        >
          <div>
            <p>
              <SystemToolSortIcon />
            </p>
          </div>
          <div>
            <p style={{ color: "rgb(1, 148, 243)" }}>Ưu tiên bay thẳng</p>
            <p className="text-xs" style={{ color: "rgb(104, 113, 118)" }}>
              2.158.000 VNĐ
            </p>
          </div>
          <div>
            <p>
              <ArrowDownIcon />
            </p>
          </div>
        </div>
      </div>
      <div
        ref={popupRef}
        className={`w-4/12 border border-solid border-slate-200 bg-white rounded-md float-right mr-6 transition-all duration-300 ease-in-out`}
        style={{
          width: "35%",
          marginTop: "-8px",
          marginRight: "88px",
          opacity: showPopup ? 1 : 0,
          transform: showPopup ? "translateY(0)" : "translateY(10px)",
        }}
      >
        <div>
          <p
            className={`px-3 py-3 border-b border-solid border-slate-200 rounded-md text-sm hover:bg-slate-100 active:bg-sky-100`}
            style={{ fontWeight: "600" }}
            onClick={() => handlePopupClick("Cất cánh sớm nhất")}
          >
            Cất cánh sớm nhất
          </p>
          <p
            className="px-3 py-3 border-b border-solid border-slate-200 rounded-md text-sm hover:bg-slate-100 active:bg-sky-100"
            style={{ fontWeight: "600" }}
            onClick={() => handlePopupClick("Cất cánh muộn nhất")}
          >
            Cất cánh muộn nhất
          </p>
          <p
            className="px-3 py-3 border-b border-solid border-slate-200 rounded-md text-sm hover:bg-slate-100 active:bg-sky-100"
            style={{ fontWeight: "600" }}
            onClick={() => handlePopupClick("Hạ cánh sớm nhất")}
          >
            Hạ cánh sớm nhất
          </p>
          <p
            className="px-3 py-3 rounded-md text-sm hover:bg-slate-100 active:bg-sky-100"
            style={{ fontWeight: "600" }}
            onClick={() => handlePopupClick("Hạ cánh muộn nhất")}
          >
            Hạ cánh muộn nhất
          </p>
        </div>
      </div>
    </div>
  );
}
export default FlightSort;
