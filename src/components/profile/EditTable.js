import React from "react";
import { Link } from "react-router-dom";

function EditTable() {
  return (
    <div
      className="edit-table left-content h-fit rounded-lg border-solid border-2 border-gray-200"
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
          <div className="flex items-center content-center gap-2 ms-4 h-10">
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
            className="flex items-center content-center gap-2 ms-4 h-8"
            style={{
              fontFamily: "Arial",
            }}
          >
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/f/f883d30731f5559aadffe0c6060fdded.svg"
              alt="my-card"
            />
            <p className=" whitespace-nowrap">Thẻ của tôi</p>
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
          <div className="flex items-center content-center gap-2 ms-4 h-8">
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/8c9954122d8006592fbcbd4a82ac994c.svg"
              alt="booking-icon"
            />
            <p>Đặt khách sạn</p>
          </div>
        </Link>

        <Link
          className="hover:bg-slate-200"
          style={{
            fontFamily: "Arial",
          }}
        >
          <div className="flex items-center content-center gap-2 ms-4 h-8">
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/8c9954122d8006592fbcbd4a82ac994c.svg"
              alt="booking-icon"
            />
            <p>Đặt máy bay</p>
          </div>
        </Link>

        <Link
          className="hover:bg-slate-200"
          style={{
            fontFamily: "Arial",
          }}
        >
          <div className="flex items-center content-center gap-2 ms-4 h-8">
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/8c9954122d8006592fbcbd4a82ac994c.svg"
              alt="booking-icon"
            />
            <p>Đặt combo</p>
          </div>
        </Link>

        <div
          className="w-4/5 mt-1 ms-6"
          style={{ borderTop: "2px solid #e3f0ff" }}
        ></div>

        <Link
          className="hover:bg-slate-200"
          style={{
            fontFamily: "Arial",
          }}
        >
          <div className="flex items-center content-center gap-1 ms-4 h-8">
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/306886d7684a4b93b41b2726dabb61c7.svg"
              alt="customer-icon"
            />
            <p>Thông tin hành khách đã lưu</p>
          </div>
        </Link>

        <Link
          className="hover:bg-slate-200"
          style={{
            fontFamily: "Arial",
          }}
        >
          <div className="flex items-center content-center gap-1 ms-4 mb-3 h-7">
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/336593031502efcd0f97e6b35e7703a1.svg"
              alt="logOut-icon"
            />
            <p> Đang đăng xuất</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default EditTable;
