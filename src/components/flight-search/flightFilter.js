import React, { useState } from "react";
import RangeSlider from "./RangeSlider";

function FlightFilter({ flightBrands }) {
  const [lists, setList] = useState(["a", "b", "c"]);
  const [lists2, setList2] = useState(["a", "b", "c"]);
  const [list3, setList3] = useState(["a", "b", "c"]);
  const [showList, setShowList] = useState({
    list1: false,
    list2: false,
    list3: false,
  });
  const [show, setShow] = useState(false);
  const toogleShow = () => {
    setShow(!show);
  };
  const [check, setCheck] = useState({});

  const toggleList = (listName) => {
    setShowList((prevState) => ({
      ...prevState,
      [listName]: !prevState[listName],
    }));
  };
  const handleCheck = (element) => {
    setCheck((prevIcons) => ({
      ...prevIcons,
      [element]: !prevIcons[element],
    }));
  };
  return (
    <div className="flight-search-container">
      <div className="flight-filter">
        <div className="flight-filter__title">
          <span className="flight-filter__title__elem1">Bộ lọc</span>
          <span className="flight-filter__title__elem2">Đặt lại</span>
        </div>
        <div className="flight-filter__item-container">
          <div className="flight-filter__item-container__item">
            <div
              className={`flight-filter__item-container__item__title ${
                showList.list1 ? "show" : ""
              }`}
              onClick={() => toggleList("list1")}
            >
              <span className="flight-filter__item-container__item__title_elem1">
                Hãng hàng không
              </span>
              <span className="flight-filter__item-container__item__title_elem2">
                <i className="fa-solid fa-chevron-down"></i>
              </span>
            </div>
            <div
              className={`flight-filter__item-container__item__brands ${
                showList.list1 ? "show" : ""
              }`}
            >
              {lists.map((element) => (
                <div
                  key={element}
                  className="flight-filter__item-container__item__brands__item pb-1 "
                  onClick={() => handleCheck(element)}
                >
                  {!check[element] ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      accentColor="#CDD0D1"
                      fillColor="#0194F3"
                      style={{
                        border: "1px solid black",
                        borderRadius: "5px",
                      }}
                    >
                      <path
                        d="M6.5 12L10.5 16L18 8.5"
                        stroke="#333"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      accentColor="#CDD0D1"
                      fillColor="#0194F3"
                      style={{
                        backgroundColor: "rgb(1, 148, 243)",
                        color: "white",
                        borderRadius: "5px",
                      }}
                    >
                      <path
                        d="M6.5 12L10.5 16L18 8.5"
                        stroke="#FFFF"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  )}

                  <span>{element}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flight-filter__item-container">
          <div className="flight-filter__item-container__item">
            <div className="flight-filter__item-container__item__title">
              <span className="flight-filter__item-container__item__title_elem1">
                Thời gian bay
              </span>
              <span className="flight-filter__item-container__item__title_elem2">
                0h - 24h
              </span>
            </div>
            <RangeSlider min={0} max={24} />
          </div>
        </div>
        <div className="flight-filter__item-container">
          <div className="flight-filter__item-container__item">
            <div className="flight-filter__item-container__item__title">
              <span className="flight-filter__item-container__item__title_elem1">
                Giá
              </span>
            </div>
            <RangeSlider min={0} max={100} />
          </div>
        </div>
        <div
          className="flight-filter__item-container"
          onClick={() => toggleList("list2")}
        >
          <div className="flight-filter__item-container__item">
            <div
              className={`flight-filter__item-container__item__title ${
                showList.list2 ? "show" : ""
              }`}
            >
              <span className="flight-filter__item-container__item__title_elem1">
                Tiện ích
              </span>
              <span className="flight-filter__item-container__item__title_elem2">
                <i className="fa-solid fa-chevron-down"></i>
              </span>
            </div>
            <div
              className={`flight-filter__item-container__item__brands ${
                showList.list2 ? "show" : ""
              }`}
            >
              {lists2.map((element) => (
                <div key={element}>
                  {/* /*{" "}
                <p>
                  <span>
                    <i
                      className="fa-light fa-square-check"
                      style="color: #A4A6A8;"
                    ></i>
                  </span>
                  <span>
                    <img src={element.imgUrl} alt="flight brand logo" />
                  </span>
                  <span>${element.name}</span>
                </p>{" "} */}
                  <p>{element}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flight-filter__item-container">
          <div className="flight-filter__item-container__item">
            <div
              className={`flight-filter__item-container__item__title ${
                show ? "show" : ""
              }`}
              onClick={toogleShow}
            >
              <span className="flight-filter__item-container__item__title_elem1">
                Thời gian
              </span>
              <span className="flight-filter__item-container__item__title_elem2">
                <i className="fa-solid fa-chevron-down"></i>
              </span>
            </div>
            <div
              className={`flight-filter__item-container__item__brands ${
                show ? "show" : ""
              }`}
            >
              <div className="flex flex-col gap-3">
                <h1 style={{ fontSize: "18px" }} className="pt-2">
                  Giờ cất cánh
                </h1>
                <div className="flex justify-between">
                  <div
                    className="bg-zinc-200"
                    style={{
                      width: "45%",
                      padding: "15px 20px",
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ whiteSpace: "nowrap", fontSize: "small" }}>
                      Đêm đến sáng
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p style={{ fontSize: "17px", color: "blue" }}>00:00</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>:</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>06:00</p>
                    </div>
                  </div>
                  <div
                    className="bg-zinc-200"
                    style={{
                      width: "45%",
                      padding: "15px 20px",
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ whiteSpace: "nowrap", fontSize: "small" }}>
                      Sáng đến trưa
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p style={{ fontSize: "17px", color: "blue" }}>06:00</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>:</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>12:00</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div
                    className="bg-zinc-200"
                    style={{
                      width: "45%",
                      padding: "15px 20px",
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ whiteSpace: "nowrap", fontSize: "small" }}>
                      Trưa đến tối
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p style={{ fontSize: "17px", color: "blue" }}>12:00</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>:</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>18:00</p>
                    </div>
                  </div>

                  <div
                    className="bg-zinc-200"
                    style={{
                      width: "45%",
                      padding: "15px 20px",
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ whiteSpace: "nowrap", fontSize: "small" }}>
                      Tối đến đêm
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p style={{ fontSize: "17px", color: "blue" }}>18:00</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>:</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>24:00</p>
                    </div>
                  </div>
                </div>
                <h1 style={{ fontSize: "18px" }} className="pt-2">
                  Giờ hạ cánh
                </h1>
                <div className="flex justify-between">
                  <div
                    className="bg-zinc-200"
                    style={{
                      width: "45%",
                      padding: "15px 20px",
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ whiteSpace: "nowrap", fontSize: "small" }}>
                      Đêm đến sáng
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p style={{ fontSize: "17px", color: "blue" }}>00:00</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>:</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>06:00</p>
                    </div>
                  </div>
                  <div
                    className="bg-zinc-200"
                    style={{
                      width: "45%",
                      padding: "15px 20px",
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ whiteSpace: "nowrap", fontSize: "small" }}>
                      Sáng đến trưa
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p style={{ fontSize: "17px", color: "blue" }}>06:00</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>:</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>12:00</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div
                    className="bg-zinc-200"
                    style={{
                      width: "45%",
                      padding: "15px 20px",
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ whiteSpace: "nowrap", fontSize: "small" }}>
                      Trưa đến tối
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p style={{ fontSize: "17px", color: "blue" }}>12:00</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>:</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>18:00</p>
                    </div>
                  </div>

                  <div
                    className="bg-zinc-200"
                    style={{
                      width: "45%",
                      padding: "15px 20px",
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ whiteSpace: "nowrap", fontSize: "small" }}>
                      Tối đến đêm
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p style={{ fontSize: "17px", color: "blue" }}>18:00</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>:</p>
                      <p style={{ fontSize: "17px", color: "blue" }}>24:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default FlightFilter;
