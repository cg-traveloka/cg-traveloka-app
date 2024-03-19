import React from "react";

function EditProfileContent1() {
  return (
    <div className="content mx-auto my-auto w-4/5 pt-5">
      <div className="flex gap 4">
        <div
          className="left-content border-solid border-2 border-gray-200"
          style={{ width: "300px" }}
        >
          <div className="gap-4 flex flex-col">
            <div className="items-center content-center flex gap-5 ms-5 py-1">
              <div
                className="flex items-center justify-center"
                style={{
                  borderTopLeftRadius: "64px",
                  borderTopRightRadius: "64px",
                  borderBottomRightRadius: "64px",
                  borderBottomLeftRadius: "64px",
                  boxShadow: "0px 1px 2px rgba(3, 18, 26, 0.2)",
                  height: "64px",
                  width: "64px",
                  color: "gray",
                }}
              >
                <p style={{ fontWeight: "600", fontSize: "25px" }}>VV</p>
              </div>

              <div>
                <p className="font-bold">Việt Vũ</p>
                <p>Google</p>
              </div>
            </div>

            <hr />

            <div className="flex items-center content-center gap-2 ms-5">
              <img
                src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/825f4dbdd091e72c803ff3a24ca58c26.svg"
                alt=""
                width="25"
                height="25"
              />
              <p className="whitespace-nowrap">Điểm thưởng của tôi</p>
            </div>

            <div className="flex items-center content-center gap-2 ms-5">
              <i
                className="fa-regular fa-credit-card"
                style={{ color: "#0194f3" }}
              ></i>
              <p className="whitespace-nowrap">Thẻ của tôi</p>
            </div>

            <div
              className="w-4/5 mt-2 ms-7"
              style={{ borderTop: "2px solid #e3f0ff" }}
            ></div>

            <div className="flex items-center content-center gap-2 ms-5">
              <i
                className="fa-solid fa-calendar-days"
                style={{ color: "#0194f3" }}
              ></i>
              <p>Đặt chỗ của tôi</p>
            </div>

            <div className="flex items-center content-center gap-2 ms-5">
              <i
                className="fa-solid fa-clipboard-list"
                style={{ color: "#0194f3" }}
              ></i>
              <p>Danh sách giao dịch</p>
            </div>

            <div className="flex items-center content-center gap-2 ms-5">
              <i
                className="fa-solid fa-bell fa-sm"
                style={{ color: "#0194f3" }}
              ></i>
              <p>Thông báo giá vé máy bay</p>
            </div>

            <div className="flex items-center content-center gap-1 ms-4">
              <i
                className="fa-solid fa-user-group"
                style={{ color: "#0194f3" }}
              ></i>
              <p>Thông tin hành khách đã lưu</p>
            </div>

            <div className="flex items-center content-center gap-2 ms-4">
              <i
                className="fa-regular fa-envelope"
                style={{ color: "#0194f3" }}
              ></i>
              <p>Khuyến mãi</p>
            </div>

            <div
              className="w-4/5 mt-2 ms-7"
              style={{ borderTop: "2px solid #e3f0ff" }}
            ></div>

            <div className="flex items-center content-center gap-2 ms-5">
              <i className="fa-solid fa-gear" style={{ color: "#0194f3" }}></i>
              <p>Tài khoản</p>
            </div>

            <div className="flex items-center content-center gap-2 ms-5 mb-5">
              <i
                className="fa-solid fa-power-off"
                style={{ color: "#0194f3" }}
              ></i>
              <p>Đang đăng xuất</p>
            </div>
          </div>
        </div>

        <div className="content mx-auto w-4/5 ">
          <div className="flex gap 4">
            <div className="right-content w-2/3 pl-6 ">
              <div className="flex justify-between pb-4 ">
                <h1 className="font-bold text-2xl">Điểm thưởng của tôi</h1>
                <button href="#" style={{ color: "rgba(1, 148, 243, 1)" }}>
                  Tìm hiểu thêm
                </button>
              </div>
              <div
                className="bg-gray flex h-12 rounded-lg border-solid border-2 border-gray-200 pt-3"
                style={{}}
              >
                <div
                  className="w-1/3"
                  style={{
                    backgroundColor: "rgb(27, 160, 226)",
                  }}
                >
                  <h1>Điểm khả dụng</h1>
                </div>
                <div className="w-2/3">
                  <h1>Tiến trình tích điểm</h1>
                </div>

                <div className="whitespace-nowrap">
                  <h1>Chi tiết</h1>
                </div>
                <div className="flex-grow"></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfileContent1;
