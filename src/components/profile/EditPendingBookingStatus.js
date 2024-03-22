import React from "react";
import EditTable from "./EditTable";

function EditPendingBookingStatus() {
  return (
    <div className="edit-booking-hotel mx-auto my-auto w-8/12 pt-5">
      <div className="flex">
        <EditTable />
        <div className="right-content w-4/5 pl-5">
          <div className="flex">
            <h1 className="font-bold text-2xl mt-7 flex">Đang mua hàng</h1>
            <div>
              <p>1</p>
            </div>
          </div>

          <div className="mt-5 flex flex-col justify-between pb-4">
            <h1 className="font-bold text-2xl mt-7">
              Vé điện tử & phiếu thanh toán hiện hành
            </h1>
          </div>

          <div className="mt-2 shadow-md bg-gray rounded-lg border-solid border-2 border-gray-200">
            <div className="ms-2 my-3">
              <div className="px-2 me-2 gap-4 flex">
                <img
                  src="https://ik.imagekit.io/tvlk/image/imageResource/2020/07/10/1594367281441-5ec1b573d106b7aec243b19efa02ac56.svg?tr=h-96,q-75,w-96"
                  alt="booking-hotel-icon"
                />

                <div className="flex flex-col justify-between">
                  <h3 className="mt-3 font-bold text-xl">
                    Không tìm thấy đặt chỗ
                  </h3>
                  <p className="mb-1 text-base">
                    Mọi chỗ bạn đặt sẽ được hiển thị tại đây. Hiện bạn chưa có
                    bất kỳ đặt chỗ nào, hãy đặt trên trang chủ ngay!
                  </p>
                </div>
              </div>
            </div>
          </div>

          <h1 className="font-bold text-2xl mt-7">Lịch sử giao dịch</h1>

          <div className="mt-2 shadow-md bg-gray rounded-lg border-solid border-2 border-gray-200">
            <div className="ms-3 my-4">
              <div className="px-2 me-2 gap-4 flex">
                <div className="flex justify-between">
                  <p className="mb-1 font-semibold text-base">
                    Xem
                    <button
                      type="submit"
                      className="ms-1 font-bold text-blue-500"
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

export default EditPendingBookingStatus;
