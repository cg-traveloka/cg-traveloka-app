import React from "react";
import { Link } from "react-router-dom";

function FlightInfo() {
  return (
    <div>
      <div
        className="flight-search-info bg-white p-4 rounded-md shadow-md sm:w-2/3 lg:w-1/2"
        style={{ width: "90%" }}
      >
        <div className="flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="flex flex-col gap-2 w-72">
              <div className="flex items-center">
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2022/11/29/1669692919958-81f0c812fcaa9551ef47319232a413c0.png?tr=h-24,q-75"
                  loading="lazy"
                  decoding="async"
                  height="24"
                  alt="Airplane Icon"
                  className="max-w-6 object-contain"
                />
                <h2 className="text-lg font-semibold text-green-500">
                  Vietjet Airlines
                </h2>
              </div>
              <div className="flex border-solid items-center justify-center border-2 border-green-500 rounded-xl text-green-500 p-1 gap-3 w-24">
                <i className="fas fa-briefcase"></i>
                <i className="fas fa-utensils"></i>
                <i className="fas fa-desktop"></i>
              </div>
            </div>
            <div className="flex gap-3 w-72">
              <div className="flex flex-col mt-5 items-center justify-center">
                <p>20:15</p>
                <p className="text-sm text-gray-500">SGN</p>
              </div>
              <div className="flex flex-col gap-1 items-center justify-center">
                <p className="text-sm text-gray-500">1h 35m</p>
                <div className="flex items-center">
                  <div className="h-2 w-2 bg-gray-400 rounded-full opacity-50"></div>
                  <div className="h-0.5 w-20 bg-gray-400"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                </div>
                <p className="text-sm text-gray-500">Bay Thẳng</p>
              </div>
              <div className="flex flex-col mt-5 items-center justify-center">
                <p>17:35</p>
                <p className="text-sm text-gray-500">DAD</p>
              </div>
            </div>
            <div className="flex flex-col items-center pl-5 w-40 mt-1">
              <div className="flex items-center">
                <p className="text-red-500 whitespace-nowrap">2.561.475 VND/</p>
                <p className="text-gray-500 text-xs">khách</p>
              </div>
              <div className="flex items-center">
                <i className="fas fa-coins text-yellow-500"></i>
                <p className="text-sm ml-2 whitespace-nowrap">
                  Nhận 2.561 điểm
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="border-solid border-2 border-red-500 text-red-500 rounded-xl w-24 p-1 ">
              Thêm ưu đãi
            </div>
            <div className="border-solid border-2 border-green-500 rounded-xl text-green-500 p-1">
              Tặng gói mã 800k
            </div>
          </div>
        </div>
        <div className="bg-white text-gray-900 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-blue-600">
                Chi tiết
              </Link>
              <Link href="#" className="hover:text-blue-600">
                Giá vé & Quyền lợi
              </Link>
              <Link href="#" className="hover:text-blue-600">
                Hoàn vé
              </Link>
              <Link href="#" className="hover:text-blue-600">
                Đổi lịch
              </Link>
              <Link href="#" className="hover:text-blue-600">
                Khuyến mãi <i className="fas fa-gift"></i>
              </Link>
            </div>
            <button className="bg-blue-600 text-white rounded px-8 py-2">
              Chọn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlightInfo;
