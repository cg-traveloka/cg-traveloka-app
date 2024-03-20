import React from "react";
import { Link } from "react-router-dom";

function EditTable() {
  return (
    <div
      className="left-content border-solid border-2 border-gray-200"
      style={{ width: "300px" }}
    >
      <div className="gap-3 flex flex-col">
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

        <Link
          className="hover:bg-slate-200"
          style={{
            fontFamily: "Arial",
          }}
        >
          <div className="flex items-center content-center gap-1 ms-4 h-10">
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/825f4dbdd091e72c803ff3a24ca58c26.svg"
              alt=""
              width="25"
              height="25"
            />
            <p className="whitespace-nowrap">Điểm thưởng của tôi</p>
          </div>
        </Link>

        <Link className="hover:bg-slate-200">
          <div
            className="flex items-center content-center gap-2 ms-5 h-8"
            style={{
              fontFamily: "Arial",
            }}
          >
            <i
              className="fa-regular fa-credit-card"
              style={{ color: "#0194f3" }}
            ></i>
            <p className="whitespace-nowrap">Thẻ của tôi</p>
          </div>
        </Link>

        <div
          className="w-4/5 mt-2 ms-7"
          style={{ borderTop: "2px solid #e3f0ff" }}
        ></div>

        <Link
          className="hover:bg-slate-200"
          style={{
            fontFamily: "Arial",
          }}
        >
          <div className="flex items-center content-center gap-2 ms-5 h-8">
            <i
              className="fa-solid fa-calendar-days"
              style={{ color: "#0194f3" }}
            ></i>
            <p>Đặt chỗ của tôi</p>
          </div>
        </Link>

        <Link
          className="hover:bg-slate-200"
          style={{
            fontFamily: "Arial",
          }}
        >
          <div className="flex items-center content-center gap-2 ms-5 h-8">
            <i
              className="fa-solid fa-clipboard-list"
              style={{ color: "#0194f3" }}
            ></i>
            <p>Danh sách giao dịch</p>
          </div>
        </Link>

        <Link
          className="hover:bg-slate-200"
          style={{
            fontFamily: "Arial",
          }}
        >
          <div className="flex items-center content-center gap-2 ms-5 h-8">
            <i
              className="fa-solid fa-bell fa-sm"
              style={{ color: "#0194f3" }}
            ></i>
            <p>Thông báo giá vé máy bay</p>
          </div>
        </Link>

        <Link
          className="hover:bg-slate-200"
          style={{
            fontFamily: "Arial",
          }}
        >
          <div className="flex items-center content-center gap-1 ms-4 h-8">
            <i
              className="fa-solid fa-user-group"
              style={{ color: "#0194f3" }}
            ></i>
            <p>Thông tin hành khách đã lưu</p>
          </div>
        </Link>

        <Link
          className="hover:bg-slate-200"
          style={{
            fontFamily: "Arial",
          }}
        >
          <div className="flex items-center content-center gap-2 ms-4 h-8">
            <i
              className="fa-regular fa-envelope"
              style={{ color: "#0194f3" }}
            ></i>
            <p>Khuyến mãi</p>
          </div>
        </Link>

        <div
          className="w-4/5 mt-2 ms-7"
          style={{ borderTop: "2px solid #e3f0ff" }}
        ></div>

        <Link
          className="hover:bg-slate-200"
          style={{
            fontFamily: "Arial",
          }}
        >
          <div className="flex items-center content-center gap-2 ms-5 h-8">
            <i className="fa-solid fa-gear" style={{ color: "#0194f3" }}></i>
            <p>Tài khoản</p>
          </div>
        </Link>

        <Link
          className="hover:bg-slate-200"
          style={{
            fontFamily: "Arial",
          }}
        >
          <div className="flex items-center content-center gap-2 ms-5 mb-5 h-7">
            <i
              className="fa-solid fa-power-off"
              style={{ color: "#0194f3" }}
            ></i>
            <p> Đang đăng xuất</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default EditTable;
