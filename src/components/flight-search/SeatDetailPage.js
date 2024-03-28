import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  selectFromAirPortLocationName,
  selectSearchParams,
  selectToAirPorLocationName,
} from "../../redux/features/flightSlice";
import axios from "../../config/privateAxios";
import { toast } from "react-toastify";
function SeatDetailPage(props) {
  const location = useLocation();

  const searchParams = useSelector(selectSearchParams);

  const { seat, flight } = location.state;
  const fromAirportLocationName = useSelector(selectFromAirPortLocationName);
  const toAirportLocationName = useSelector(selectToAirPorLocationName);

  const ticketAirPlane = {
    seatInfoId: seat.id,
    quantity: searchParams.seatQuantity,
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/ticket", ticketAirPlane);
      console.log(response.data);
      toast.success("Đặt vé thành công");
    } catch (error) {
      console.error(error);
      toast.error("Đặt vé thất bại");
      alert("Đặt vé thất bại!");
    }
  };
  return (
    <div class="flex items-start justify-center min-h-screen bg-blue-100">
      <div class="p-8 bg-white rounded-lg shadow-lg max-w-md w-full flex flex-col justify-center items-center space-y-4">
        <img
          src={flight.airPlant.logoUrl}
          alt="Airline Logo"
          class="h-16 w-16 rounded-full"
        />
        <h2 class="text-2xl font-bold mb-4 text-blue-800">
          Loại ghế: {seat.seatType.name}
        </h2>
        <div class="flex justify-between w-full">
          <div class="text-left w-1/2">
            <p class="text-blue-700">Hãng hàng không:</p>
            <p class="text-blue-700">Thời gian khởi hành:</p>
            <p class="text-blue-700">Thời gian đến:</p>
            <p class="text-blue-700">Thời gian bay:</p>
          </div>
          <div class="text-right w-1/2">
            <p class="text-blue-700">{flight.airPlant.name}</p>
            <p class="text-blue-700">
              {new Date(flight.startTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p class="text-blue-700">
              {new Date(flight.endTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <p class="text-blue-700">
              {Math.abs(new Date(flight.endTime) - new Date(flight.startTime)) /
                36e5}{" "}
              giờ
            </p>
          </div>
        </div>
        <p class="text-blue-700 ">
          Chuyến bay từ Thành phố Hồ Chí Minh đến Thành phố Hà Nội
        </p>
        <div class="border-t border-gray-300 w-full py-2 text-right">
          <p class="text-blue-700 font-semibold text-xl">
            Tổng giá tiền:{" "}
            {(seat.unitPrice * searchParams.seatQuantity).toLocaleString(
              "vi-VN"
            )}{" "}
            VND
          </p>
        </div>
        <button
          onClick={handleSubmit}
          class="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
        >
          Đặt chỗ
        </button>
      </div>
    </div>
  );
}

export default SeatDetailPage;
