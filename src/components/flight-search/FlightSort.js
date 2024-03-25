import React, { useState } from "react";
function FlightSort() {
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
        <div
          className={`text-center w-1/4 py-1 hover:border-blue-300 hover:border-2 hover:cursor-pointer hover:border-solid rounded-lg hover:bg-sky-100 ml-4
        ${isActive.div1 ? "bg-slate-100" : ""}`}
          onClick={() => {
            setIsActive({ div1: !isActive.div1 });
            setShowPopup(false);
          }}
        >
          <p style={{ color: "rgb(1, 148, 243)" }}>Gía thấp nhất</p>
          <p className="text-xs" style={{ color: "rgb(104, 113, 118)" }}>
            1.894.000 VNĐ
          </p>
        </div>
        <div
          className={`w-1/3 text-center py-1 hover:border-blue-300 hover:border-2 hover:cursor-pointer hover:border-solid rounded-lg hover:bg-sky-100
         ${isActive.div2 ? "bg-slate-100" : ""}`}
          onClick={() => {
            setIsActive({ div2: !isActive.div2 });
            setShowPopup(false);
          }}
        >
          <p style={{ color: "rgb(1, 148, 243)" }}>Thời gian bay ngắn nhất</p>
          <p className="text-xs" style={{ color: "rgb(104, 113, 118)" }}>
            1.953.000 VNĐ{" "}
          </p>
        </div>
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
              <i
                className="fa-solid fa-bars-staggered"
                style={{ color: "#5D6469" }}
              ></i>
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
              <i
                className="fa-solid fa-chevron-down"
                style={{ color: "#5D6469" }}
              ></i>
            </p>
          </div>
        </div>
      </div>
      <div
        className={`w-4/12 border border-solid border-slate-200 bg-white rounded-md float-right mr-6 transition-all duration-300 ease-in-out`}
        style={{
          width: "35%",
          marginTop: "-8px",
          opacity: showPopup ? 1 : 0,
          transform: showPopup ? "translateY(0)" : "translateY(10px)",
        }}
      >
        <div>
          <p
            className={`px-3 py-3 border-b border-solid border-slate-200 rounded-md text-sm hover:bg-slate-100 active:bg-sky-100`}
            style={{ fontWeight: "600" }}
          >
            Cất cánh sớm nhất
          </p>
          <p
            className="px-3 py-3 border-b border-solid border-slate-200 rounded-md text-sm hover:bg-slate-100 active:bg-sky-100"
            style={{ fontWeight: "600" }}
          >
            Cất cánh muộn nhất
          </p>
          <p
            className="px-3 py-3 border-b border-solid border-slate-200 rounded-md text-sm hover:bg-slate-100 active:bg-sky-100"
            style={{ fontWeight: "600" }}
          >
            Hạ cánh sớm nhất
          </p>
          <p
            className="px-3 py-3 rounded-md text-sm hover:bg-slate-100 active:bg-sky-100"
            style={{ fontWeight: "600" }}
          >
            Hạ cánh muộn nhất
          </p>
        </div>
      </div>
    </div>
  );
}
export default FlightSort;
