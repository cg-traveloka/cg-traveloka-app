import React, { useEffect, useState } from "react";
import Calendar from "../Calender";
function FlightTitle() {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState(Array(6).fill(false));
  const [isHovered, setIsHovered] = useState(false);
  const [listDate, setListDate] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  useEffect(() => {
    const tempList = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      tempList.push(date);
    }
    setListDate(tempList);
  }, [startDate]);
  const handleClick = (index) => {
    const newSelectedDates = Array(6).fill(false);
    newSelectedDates[index] = true;
    setSelectedDates(newSelectedDates);
  };
  return (
    <div className="container w-3/6 mx-auto">
      <div
        className="bg-cover bg-center my-2 rounded-lg"
        style={{
          backgroundImage: `linear-gradient(to left bottom, transparent 50%, white), url('https://ik.imagekit.io/tvlk/blog/2021/04/DEFAULT-ARTICLE-DESKTOP-Large.png')`,
        }}
      >
        <div className="h-3 "></div>
        <div className="flex w-9/12 rounded-lg mx-3 bg-blue-500">
          <div
            className={`rounded-lg w-${
              isHovered ? "full" : "11/12"
            } mr-3 py-2 bg-white transition-all duration-300 ease-in-out`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="flex justify-between mx-4">
              <div>
                <p className="mb-2 font-semibold flex gap-1">
                  <span>TP HCM (SGN)</span>
                  <span>
                    <i className="fa-solid fa-arrow-right fa-xs"></i>
                  </span>
                  <span>H. Kông (HKG)</span>
                </p>
                <p className="text-gray-600 flex gap-2 text-sm">
                  <span>Thứ 4, 20 thg 3 2024</span>
                  <span>|</span>
                  <span>1 hành khách</span>
                  <span>|</span>
                  <span>Phổ thông</span>
                </p>
              </div>
              <div className="flex self-center gap-4 ">
                {isHovered && (
                  <p className="hover:text-blue-500">Đổi tìm kiếm</p>
                )}
                <i className="fa-solid fa-magnifying-glass text-blue-500"></i>
              </div>
            </div>
          </div>
          <div className="self-center">
            <i className="fa-solid fa-bell pl-0.5 text-yellow-400"></i>
          </div>
        </div>

        <div
          className="flex gap-1 mx-3 my-2 h-12 items-center justify-between rounded-lg"
          style={{ backgroundColor: "#0264C8" }}
        >
          <div className="w-5/6 flex justify-between items-center mx-5">
            {listDate.map((date, index) => (
              <div
                key={index}
                className={`py-2 px-2 cursor-pointer transition duration-300 ease-in-out text-sm ${
                  selectedDates[index] ? "font-bold bg-sky-500 rounded-lg" : ""
                }`}
                onClick={() => handleClick(index)}
              >
                <p className="text-white">{date.toLocaleDateString("en-GB")}</p>
              </div>
            ))}
          </div>
          <div className="self-center mr-3">
            <i
              class="fa-solid fa-chevron-right fa-xs"
              style={{ color: "white" }}
            ></i>
          </div>
          <div
            className="self-center h-full w-10 justify-self-end border border-solid rounded-lg flex justify-center items-center transition-all duration-300 ease-in-out :hover:bg-sky-500  :visited:bg-sky-500 :active:bg-sky-500 :focus:bg-sky-500 hover:cursor-pointer"
            style={{ borderColor: "#005FA8" }}
            onClick={() => {
              setShowCalendar(!showCalendar);
            }}
          >
            <i
              className="fa-solid fa-calendar-days fa-lg px-3 "
              style={{ color: "white" }}
            ></i>
          </div>
        </div>
        <div className="flex justify-start gap-3 mx-3 my-2 h-12 items-center rounded-lg bg-white">
          <div className="ml-2">
            <i className="fa-solid fa-percent fa-sm border border-solid rounded-full ml-2 px-1 py-2"></i>
          </div>
          <div className="border border-solid border-slate-300 rounded-2xl">
            <p className="px-3 py-1 text-sm font-semibold">Thêm ưu đãi</p>
          </div>
          <div className="border border-solid border-slate-300 rounded-2xl">
            <p className="px-3 py-1 text-sm font-semibold">Tặng gói mã 800K</p>
          </div>
        </div>
        <div className="h-1"></div>
      </div>
      {showCalendar && (
        <div className="transition-all duration-500 ease-in-out flex justify-end w-3/6 absolute top-32 right-1/4 border border-solid border-slate-300 rounded-lg bg-white max-w-max">
          <Calendar
            date={(data) => {
              setStartDate(data);
              setSelectedDates(Array(6).fill(false));
              setShowCalendar(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
export default FlightTitle;
