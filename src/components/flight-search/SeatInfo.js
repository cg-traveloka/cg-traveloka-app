import React, { useEffect, useState } from "react";
import {
  selectFromAirPortLocationName,
  selectSearchParams,
  selectToAirPorLocationName,
} from "../../redux/features/flightSlice";
import { useSelector } from "react-redux";
import { ArrowRightIcon } from "@mui/x-date-pickers";
import axios from "../../config/privateAxios";
import { useNavigate } from "react-router-dom";
function SeatInfo({ selectedFlight, onClose }) {
  const [show, setShow] = useState(true);
  const [seats, setSeats] = useState([]);
  const navigate = useNavigate();
  const fromAirportLocationName = useSelector(selectFromAirPortLocationName);
  const toAirportLocationName = useSelector(selectToAirPorLocationName);
  const searchParamsData = useSelector(selectSearchParams);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedSeatIndex, setSelectedSeatIndex] = useState(null);

  const handleSeatClick = (seat, index) => {
    setSelectedSeatIndex(index);
    setSelectedSeat(seat);
  };

  const handleContinueClick = () => {
    if (selectedSeat) {
      navigate("/home1", {
        state: { seat: selectedSeat, flight: selectedFlight },
      });
    } else {
      alert("Vui lòng chọn một ghế trước khi tiếp tục.");
    }
  };
  useEffect(() => {
    console.log(selectedSeat);
  }, [selectedSeat]);
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axios.post("/api/flights/seats", {
          flightId: selectedFlight.id,
          seatQuantity: searchParamsData.seatQuantity,
        });

        setSeats(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    };

    fetchSeats();
  }, [searchParamsData.flightId, searchParamsData.seatQuantity]);
  return (
    show && (
      <div
        className="containter w-8/12  top-0 h-screen right-0 absolute rounded-md flex flex-col border border-solid bg-white  border-slate-300"
        style={{ zIndex: 9999 }}
      >
        <div className="flex justify-between items-center h-16">
          <div className="mx-5 ">
            <span
              className="rounded-md py-2 hover:cursor-pointer"
              style={{ backgroundColor: "#F7F9FA" }}
              onClick={onClose}
            >
              <i className="fa-solid fa-x mx-4" style={{ color: "grey" }}></i>
            </span>
            <span className="text-2xl font-semibold mx-4 ">
              Chuyến đi của bạn
            </span>
          </div>
          <div className="mx-5">
            <span className="text-2xl font-semibold mx-4">
              <i
                className="fa-solid fa-share-nodes fa-sm"
                style={{ color: "grey" }}
              ></i>
            </span>
            <span className="text-2xl font-semibold mx-4 ">
              <i
                className="fa-solid fa-bookmark fa-sm"
                style={{ color: "grey" }}
              ></i>
            </span>
          </div>
        </div>
        <div className="bg-sky-100 w-full mt-2">
          <div
            className="rounded-md bg-white mx-auto my-4"
            style={{ width: "844px" }}
          >
            <div className="mx-4 pt-3 flex gap-2">
              <p className="flex gap-2">
                <span>
                  {selectedFlight && selectedFlight.airPlant && (
                    <p>{fromAirportLocationName.slice(0, -5)}</p>
                  )}
                </span>
                <span>⮕</span>
                <span>{toAirportLocationName.slice(0, -5)}</span>
              </p>
              <span className="text-gray-500">|</span>
              <span className="text-gray-500">
                {new Date(selectedFlight.startTime).toLocaleDateString("en-GB")}
              </span>
            </div>
            <div className="flex justify-between mx-4 pt-5">
              <div className="flex items-center gap-2">
                <img
                  src={selectedFlight.airPlant.logoUrl}
                  alt="location"
                  className="max-w-12 h-auto rounded-md"
                />
                <div className="text-sm">
                  <p>
                    {selectedFlight.airPlant.name
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </p>
                  <p className="text-gray-500">Promo</p>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-4 ">
                  <div>
                    <p
                      style={{
                        fontWeight: "500",
                        fontSize: "16px",
                        color: "rgb(3, 18, 26)",
                      }}
                    >
                      {new Date(selectedFlight.startTime).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                    <p
                      className=" text-sm text-center"
                      style={{ color: "rgb(104, 113, 118)" }}
                    >
                      {fromAirportLocationName.slice(-4)}
                    </p>
                  </div>
                  <div className="mx-2 max-w-max">
                    <p
                      className="text-sm text-center"
                      style={{ color: "rgb(104, 113, 118)" }}
                    ></p>
                    <div className="flex items-center h-3">
                      <div className="border border-solid rounded-full h-2 w-2 border-slate-300"></div>
                      <div className="border border-solid w-16 border-slate-300"></div>
                      <div className="border border-solid rounded-full h-2 w-2 border-slate-300 bg-slate-300"></div>
                    </div>
                    <p
                      className="text-sm text-center"
                      style={{ color: "rgb(104, 113, 118)" }}
                    >
                      1 điểm dừng
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: "500",
                        fontSize: "16px",
                        color: "rgb(3, 18, 26)",
                      }}
                    >
                      {new Date(selectedFlight.endTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p
                      className=" text-sm text-center"
                      style={{ color: "rgb(104, 113, 118)" }}
                    >
                      {toAirportLocationName.slice(-4)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-4 mt-4 pb-4">
              <p
                className="text-sm"
                style={{ color: "#0194F3", fontWeight: "600" }}
              >
                Chi tiết
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className="py-3 text-xl font-semibold mx-4">
            <p>Chọn loại vé của bạn</p>
          </div>
          <div className="flex mt-5 justify-start items-end mx-4 gap-4">
            {seats.map((seat, index) => (
              <div
                key={index}
                onClick={() => handleSeatClick(seat, index)}
                className={`rounded-md border w-1/3 border-solid ${
                  selectedSeatIndex === index
                    ? "border-blue-500 border-2 border-solid"
                    : "border-slate-300"
                } hover:border-sky-500 px-2 hover:scale-105 transition-transform duration-300`}
              >
                <div className="flex gap-5 items-center px-3 pt-3">
                  <img
                    src="https://ik.imagekit.io/tvlk/image/imageResource/2022/12/20/1671519148670-d3ca3132946e435bd467ccc096730670.png?tr=dpr-2,h-48,q-75,w-48"
                    alt="seat image"
                    className="max-w-12 h-auto"
                  />
                  <div className="font-semibold">{seat.seatType.name}</div>
                </div>
                <div className="mt-3 mx-2 pb-3">
                  <p className="text-center">
                    <span
                      className="font-semibold "
                      style={{ color: "rgb(255, 94, 31)" }}
                    >
                      {seat.unitPrice.toLocaleString("vi-VN")}
                    </span>
                    <span
                      className="text-right text-sm "
                      style={{ color: "rgb(104, 113, 118)" }}
                    >
                      / khách
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-2 mx-2">
                  <p className="text-sm">
                    <span>
                      <i
                        className="fa-solid fa-briefcase mr-2"
                        style={{ color: "grey" }}
                      ></i>
                    </span>
                    <span>Hành lý xách tay 1 x 7 kg</span>
                  </p>
                  <p className="text-sm">
                    <span>
                      <i
                        className="fa-solid fa-money-bill-transfer mr-2"
                        style={{ color: "grey" }}
                      ></i>
                    </span>
                    <span className="text-justify">
                      Chí phí đổi lịch bay của hãng hàng không VNĐ 378,000
                    </span>
                  </p>
                  <p className="text-sm">
                    <span>
                      <i
                        className="fa-solid fa-ticket mr-2"
                        style={{ color: "grey" }}
                      ></i>
                    </span>
                    <span>Phí hoàn vé bắt đầu từ VNĐ 378,000</span>
                  </p>
                  <p
                    className="text-end text-sm font-semibold mx-2 mt-1 pb-3"
                    style={{ color: "#0194F3" }}
                  >
                    Xem chi tiết
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-solid border-slate-200 h-1/6">
          <div className="flex justify-between items-center h-3/4 mx-4">
            <div>
              <p>
                <span>
                  <i
                    className="fa-solid fa-chevron-up mr-3"
                    style={{ color: "#0194F3" }}
                  ></i>
                </span>
                <span className="font-sm text-slate-400">
                  Tổng cộng cho 1 khách
                </span>
              </p>
              <p
                className="font-semibold text-2xl px-7 mt-2"
                style={{ color: "#FF5E1F" }}
              >
                {selectedFlight.unitPrice.toLocaleString("vi-VN")} VND
              </p>
            </div>
            <div>
              <p
                className="px-4 py-2 text-white rounded-md font-semibold text-center"
                style={{ backgroundColor: "#FF5E1F" }}
                onClick={handleContinueClick}
              >
                Tiếp tục đặt chỗ
              </p>
            </div>
          </div>
          <div className="bg-sky-100 h-1/4">
            <p className="px-4 py-1">
              <span>
                <i
                  className="fa-solid fa-coins mr-3"
                  style={{ color: "#efc325" }}
                ></i>
              </span>
              <span className="text-sm text-gray-600">
                Nhận {Math.round(selectedFlight.unitPrice / 1000)} điểm
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  );
}

export default SeatInfo;
