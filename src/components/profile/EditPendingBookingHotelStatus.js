import React, { useEffect } from "react";
import EditTable from "./EditTable";
import HotelIcon from "../icons/HotelIcon";
import { useDispatch } from "react-redux";
import axios from "../../config/privateAxios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setBooking } from "../../redux/features/bookingSlice";

function EditPendingBookingHotelStatus() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/contracts/customer/${id}`)
      .then((res) => {
        dispatch(setBooking(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const hotelName = useSelector((state) => state.booking.hotelName);
  const status = useSelector((state) => state.booking.status);
  const bookings = useSelector((state) => state.booking.bookings);

  return (
    <div className="edit-booking-hotel mx-auto my-auto w-8/12 pt-5">
      <div className="flex">
        <EditTable />
        <div className="right-content w-4/5 pl-5">
          <div className="flex font-sans">
            <h1 className="font-bold text-2xl mt-7 ">Đang mua hàng</h1>
            <p
              className="ml-2 mt-8 font-bold text-xs rounded-full text-white justify-center items-center flex h-6 w-6"
              style={{ backgroundColor: "rgb(255, 94, 31)" }}
            >
              {bookings.length}
            </p>
          </div>
          {bookings.map((booking, index) => (
            <div
              className="mt-5 shadow-md bg-gray rounded-lg border-solid border-2 border-gray-200 font-sans"
              key={index}
            >
              <div className="my-3">
                <div className="px-2 flex">
                  <div className="flex gap-3">
                    <div className="border-l-2 border-s-cyan-600 border-solid -ms-2"></div>
                    <HotelIcon />
                    <h3 className="mt-1 font-bold mb-1">{booking.hotelName}</h3>
                  </div>
                </div>

                <div className="flex mb-5 justify-between">
                  <div
                    className="mt-3 ms-3 w-36 rounded-full text-white text-sm font-medium"
                    style={{
                      backgroundColor: "rgba(1,148,243,1.00)",
                    }}
                  >
                    <p className="text-center">{booking.status}</p>
                  </div>

                  <div
                    className="mt-3 me-2 text-sm font-bold flex"
                    style={{
                      color: "rgb(1, 148, 243)",
                    }}
                  >
                    <button
                      type="submit"
                      className="text-center hover:text-blue-600 h-5 -ml-2"
                    >
                      Xem chi tiết
                    </button>

                    <span className="flex -mt-3">
                      <span className="animate-ping absolute h-2 w-2 rounded-full bg-orange-500"></span>
                      <span className="animate-ping absolute h-2 w-2 rounded-full bg-orange-500"></span>
                      <span className="rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-5 flex flex-col justify-between pb-4 font-sans">
            <h1 className="font-bold text-2xl mt-7">
              Vé điện tử & phiếu thanh toán hiện hành
            </h1>
          </div>

          <div className="mt-2 shadow-sm bg-gray rounded-lg border-solid border-2 border-gray-200 font-sans">
            <div className="ms-2 my-3">
              <div className="px-2 gap-4 flex">
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2020/07/10/1594367281441-5ec1b573d106b7aec243b19efa02ac56.svg?tr=h-96,q-75,w-96"
                  alt="booking-hotel-icon"
                />

                <div className="flex flex-col justify-between ms-2">
                  <h3 className="mt-2 font-bold text-xl">
                    Không tìm thấy đặt chỗ
                  </h3>
                  <p className="mb-5 text-base">
                    Mọi chỗ bạn đặt sẽ được hiển thị tại đây. Hiện bạn chưa có
                    bất kỳ đặt chỗ nào, hãy đặt trên trang chủ ngay!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h1 className="font-bold text-2xl mt-7 font-sans">
            Lịch sử giao dịch
          </h1>

          <div className="mt-2 shadow-sm bg-gray rounded-lg border-solid border-2 border-gray-200">
            <div className="ms-3 my-4">
              <div className="px-2 me-2 gap-4 flex">
                <div className="flex justify-between font-sans">
                  <p className="mb-1 font-semibold text-base">
                    Xem
                    <button
                      type="submit"
                      className="ms-1 font-bold"
                      style={{
                        color: "rgba(1,148,243,1.00)",
                      }}
                    >
                      Lịch sử giao dịch
                    </button>
                  </p>
                  <p className="mb-1 ms-1 font-semibold text-base">của bạn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPendingBookingHotelStatus;
