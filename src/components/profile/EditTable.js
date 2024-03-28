import React from "react";
import { Link, NavLink } from "react-router-dom";
import HotelIcon from "../icon/HotelIcon";
import AirplaneIcon from "../icon/AirplaneIcon";

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

        <NavLink
          to="/mybonus"
          className={({ isActive }) =>
            isActive ? "bg-sky-400 text-slate-100" : "hover:bg-slate-200"
          }
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
        </NavLink>

        <div
          className="w-4/5 ms-7"
          style={{ borderTop: "2px solid #e3f0ff" }}
        ></div>

        <NavLink
          to="/bookinghotel"
          className={({ isActive }) =>
            isActive ? "bg-sky-400 text-slate-100" : "hover:bg-slate-200"
          }
          style={{
            fontFamily: "Arial",
          }}
        >
          <div className="flex items-center content-center gap-3.5 ms-4 h-8">
            <HotelIcon />
            <div>Đặt khách sạn</div>
          </div>
        </NavLink>

        <NavLink
          to="/bookingTicket"
          className={({ isActive }) =>
            isActive ? "bg-sky-400 text-slate-100" : "hover:bg-slate-200"
          }
          style={{
            fontFamily: "Arial",
          }}
        >
          <div className="flex items-center content-center gap-3.5 ms-4 h-8">
            <AirplaneIcon />
            <p>Đặt máy bay</p>
          </div>
        </NavLink>

        <NavLink
          to="/bookingCombo"
          className={({ isActive }) =>
            isActive ? "bg-sky-400 text-slate-100" : "hover:bg-slate-200"
          }
          style={{
            fontFamily: "Arial",
          }}
        >
          <div className="flex items-center content-center gap-2 ms-4 h-8">
            <img
              importance="low"
              loading="lazy"
              src="https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416848403-0f73dda9b166e07508c3b4557569b43b.png?tr=q-75,w-24"
              srcSet="https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416848403-0f73dda9b166e07508c3b4557569b43b.png?tr=q-75,w-24 1x, https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416821839-8752dc371576af3bdebdbbb09ffdc7a6.png?tr=dpr-2,q-75,w-24 2x, https://ik.imagekit.io/tvlk/image/imageResource/2017/11/23/1511416821839-8752dc371576af3bdebdbbb09ffdc7a6.png?tr=dpr-3,q-75,w-24 3x"
              decoding="async"
              width="24"
              alt="airplane & city icon"
            />
            <p>Đặt combo</p>
          </div>
        </NavLink>

        <div
          className="w-4/5 mt-1 ms-6"
          style={{ borderTop: "2px solid #e3f0ff" }}
        ></div>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "bg-sky-400 text-slate-100" : "hover:bg-slate-200"
          }
          style={{
            fontFamily: "Arial",
          }}
        >
          <div className="flex items-center content-center gap-2.5 ms-3 h-8">
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/306886d7684a4b93b41b2726dabb61c7.svg"
              alt="customer-icon"
            />
            <p>Chỉnh sửa hồ sơ</p>
          </div>
        </NavLink>

        <Link
          className="hover:bg-slate-200"
          style={{
            fontFamily: "Arial",
          }}
        >
          <div className="flex items-center content-center gap-2.5 ms-3 mb-3 h-7">
            <img
              src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/3/336593031502efcd0f97e6b35e7703a1.svg"
              alt="logOut-icon"
            />
            <p>Đăng xuất</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default EditTable;
