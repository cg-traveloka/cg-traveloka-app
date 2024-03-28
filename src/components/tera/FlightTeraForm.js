import { CalendarIcon } from "@mui/x-date-pickers";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import React, { useEffect, useRef, useState } from "react";
import Calendar from "../utils/Calender";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

function FightTeraForm({ sendSubmitStatus }) {
  const [show, setShow] = useState({
    div1: false,
    div2: false,
    div3: false,
    calendar1: false,
    calendar2: false,
  });
  const [flightBrands, setFlightBrands] = useState([]);
  const [airportLocationsFrom, setAirportLocationsFrom] = useState([]);
  const [airportLocationsTo, setAirportLocationsTo] = useState([]);
  const [form, setForm] = useState({
    flightBrand: " ",
    fromLocation: " ",
    toLocation: "a",
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    normalSeatQuantity: 0,
    normalSeatPrice: 0,
    specialNormalSeatQuantity: 0,
    specialNormalSeatPrice: 0,
    businessSeatQuantity: 0,
    businessSeatPrice: 0,
    vipSeatQuantity: 0,
    vipSeatPrice: 0,
  });
  const [data, setData] = useState({
    startTime: new Date(),
    endTime: new Date() + 1,
    normalSeatQuantity: 0,
    normalSeatPrice: 0,
    specialNormalSeatQuantity: 0,
    specialNormalSeatPrice: 0,
    businessSeatQuantity: 0,
    businessSeatPrice: 0,
    vipSeatQuantity: 0,
    vipSeatPrice: 0,
  });
  const [seatError, setSeatError] = useState(false);
  const [flightBrands2, setFlightBrands2] = useState([]);
  const [airportLocation2, setAirportLocation2] = useState([]);
  const options = { timeZone: "Asia/Ho_Chi_Minh" };

  function convertDate(date) {
    return new Date(date.toLocaleString("en-US", options));
  }
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/airport")
      .then((res) => {
        setAirportLocationsFrom(res.data);
        setAirportLocationsTo(res.data);
        setAirportLocation2(res.data);

        setForm((prev) => ({
          ...prev,
          fromLocation: res.data[0].name,
          toLocation: res.data[1].name,
        }));
        setData((prev) => ({
          ...prev,
          fromAirportLocationId: res.data[0].id,
        }));
        setData((prev) => ({
          ...prev,
          toAirportLocationId: res.data[1].id,
        }));
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/airplane-brands")
      .then((res) => {
        setFlightBrands(res.data);
        setFlightBrands2(res.data);
        if (res.data[0] != null) {
          setData((prev) => ({ ...prev, airplaneBrandId: res.data[0].id }));
          setForm((prev) => ({ ...prev, flightBrand: res.data[0].name }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      startTime: convertDate(form.startDate).toISOString(),
      endTime: convertDate(form.endDate.toISOString()),
      normalSeatQuantity: form.normalSeatQuantity,
      normalSeatPrice: form.normalSeatPrice,
      specialNormalSeatQuantity: form.specialNormalSeatQuantity,
      specialNormalSeatPrice: form.specialNormalSeatPrice,
      businessSeatQuantity: form.businessSeatQuantity,
      businessSeatPrice: form.businessSeatPrice,
      vipSeatQuantity: form.vipSeatQuantity,
      vipSeatPrice: form.vipSeatPrice,
    }));
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/airplane-brands/name",
        form.flightBrand,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      setFlightBrands(response.data);
      if (response.data.length === 0) {
        if (flightBrands2[0] != null) {
          setForm((prev) => ({ ...prev, flightBrand: flightBrands2[0].name }));
          setData((prev) => ({ ...prev, airplaneBrandId: flightBrands2[0].id }));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (form && form.flightBrand) {
      fetchData();
    }
  }, [form.flightBrand]);

  const fetchData2 = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/airport/name",
        form.fromLocation,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      setAirportLocationsFrom(response.data);
      if (response.data.length === 0) {
        setForm((prev) => ({
          ...prev,
          fromLocation: airportLocation2[0].name,
        }));
        setData((prev) => ({
          ...prev,
          fromAirportLocationId: airportLocation2[0].id,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (form && form.fromLocation) {
      fetchData2();
    }
  }, [form.fromLocation]);

  const fetchData3 = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/airport/name",
        form.toLocation,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      setAirportLocationsTo(response.data);
      if (response.data.length === 0) {
        setForm((prev) => ({
          ...prev,
          toLocation: airportLocation2[1].name,
        }));
        setData((prev) => ({
          ...prev,
          toAirportLocationId: airportLocation2[1].id,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (form && form.toLocation) {
      fetchData3();
    }
  }, [form.toLocation]);

  const selectRef = useRef([null, null, null]);

  useEffect(() => {
    function handleClickOutside(event) {
      for (let i = 0; i < selectRef.current.length; i++) {
        const ref = selectRef.current[i];
        if (ref && !ref.contains(event.target)) {
          setShow({
            div1: false,
            div2: false,
            div3: false,
            calendar1: false,
            calendar2: false,
          });
        }
      }
    }

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  const handleShow = (name, value) => {
    setShow({
      div1: false,
      div2: false,
      div3: false,
      calendar1: false,
      calendar2: false,
      [name]: value,
    });
  };

  const handleSetData = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validationSchema = Yup.object().shape({
    flightBrand: Yup.string().required("Hãy chọn hãng máy bay"),
    fromLocation: Yup.string().required("Hãy chọn vị trí đi"),
    toLocation: Yup.string()
      .required("Hãy chọn vị trí đến")
      .notOneOf([Yup.ref("fromLocation")], "Điểm đến không được trùng điểm đi"),
    startDate: Yup.date()
      .required("Hãy chọn ngày đi")
      .min(new Date(Date.now() - 86400000), "Ngày đi không hợp lệ"),
    endDate: Yup.date()
      .required("Hãy chọn ngày về")
      .min(new Date(Date.now()), "Ngày về không hợp lệ")
      .test("is-required", "Ngày về không hợp lệ", function (value) {
        const startDate = this.parent.startDate;
        if (startDate) {
          return (
            value.getDate() > startDate.getDate() &&
            value.getMonth() >= startDate.getMonth() &&
            value.getFullYear() >= startDate.getFullYear()
          );
        }
        return true;
      }),
    normalSeatQuantity: Yup.number()
      .required("Hãy chọn số lượng ghế")
      .min(0, "Số lượng ghế không hợp lệ"),
    normalSeatPrice: Yup.number()
      .min(0, "Giá ghế không hợp lệ")
      .test("is-required", "Hãy chọn số lượng ghế", function (value) {
        const normalSeatQuantity = this.parent.normalSeatQuantity;
        if (normalSeatQuantity > 0) {
          return value >= 0;
        } else if (normalSeatQuantity === 0) {
          return value === 0;
        }
        return true;
      })
      .test("is-required", "Giá ghế không hợp lệ", function (value) {
        const normalSeatQuantity = this.parent.normalSeatQuantity;
        if (normalSeatQuantity > 0) {
          return value > 0;
        }
        return true;
      }),
    specialNormalSeatQuantity: Yup.number()
      .required("Hãy chọn số lượng ghế")
      .min(0, "Số lượng ghế không hợp lệ"),
    specialNormalSeatPrice: Yup.number()
      .min(0, "Giá ghế không hợp lệ")
      .test("is-required", "Hãy chọn số lượng ghế", function (value) {
        const specialNormalSeatQuantity = this.parent.specialNormalSeatQuantity;
        if (specialNormalSeatQuantity > 0) {
          return value >= 0;
        } else if (specialNormalSeatQuantity === 0) {
          return value === 0;
        }
        return true;
      })
      .test("is-required", "Giá ghế không hợp lệ", function (value) {
        const specialNormalSeatQuantity = this.parent.specialNormalSeatQuantity;
        if (specialNormalSeatQuantity > 0) {
          return value > 0;
        }
        return true;
      }),
    businessSeatQuantity: Yup.number()
      .required("Hãy chọn số lượng ghế")
      .min(0, "Giá ghế không hợp lệ"),
    businessSeatPrice: Yup.number()
      .min(0, "Giá ghế không hợp lệ")
      .test("is-required", "Hãy chọn số lượng ghế", function (value) {
        const businessSeatQuantity = this.parent.businessSeatQuantity;
        if (businessSeatQuantity > 0) {
          return value >= 0;
        } else if (businessSeatQuantity === 0) {
          return value === 0;
        }
        return true;
      })
      .test("is-required", "Giá ghế không hợp lệ", function (value) {
        const businessSeatQuantity = this.parent.businessSeatQuantity; // Define normalSeatQuantity here
        if (businessSeatQuantity > 0) {
          return value > 0;
        }
        return true; // If normalSeatQuantity is not specified, return true
      }),
    vipSeatQuantity: Yup.number()
      .required("Hãy chọn số lượng ghế")
      .min(0, "Số ghế không hợp lệ"),
    vipSeatPrice: Yup.number()
      .min(0, "Giá ghế không hợp lệ")

      .test("is-required", "Hãy chọn số lượng ghế", function (value) {
        const vipSeatQuantity = this.parent.vipSeatQuantity;
        if (vipSeatQuantity > 0) {
          return value >= 0;
        } else if (vipSeatQuantity === 0) {
          return value === 0;
        }
        return true;
      })
      .test("is-required", "Giá ghế không hợp lệ", function (value) {
        const vipSeatQuantity = this.parent.vipSeatQuantity;
        if (vipSeatQuantity > 0) {
          return value > 0;
        }
        return true;
      }),
  });

  const handleSubmit = () => {
    if (
      data.normalSeatQuantity === 0 &&
      data.specialNormalSeatQuantity === 0 &&
      data.businessSeatQuantity === 0 &&
      data.vipSeatQuantity === 0
    ) {
      setSeatError(true);
    } else {
      setSeatError(false);

      sendSubmitStatus(true);
      axios
        .post("http://localhost:8080/api/flights", data)
        .then((res) => {
          toast.success("Đăng kí chuyến bay thành công");
          // toast("Đăng kí chuyến bay thành công");
          sendSubmitStatus(false);
        })
        .catch((err) => {
          toast.error("Đăng kí chuyến bay thất bại");
          // alert("Đăng kí chuyến bay thất bại");
          sendSubmitStatus(false);
          console.log("fail");
        });
    }
  };

  const handleChange = (event, form) => {
    const { name, value } = event.target;

    if (["startDate", "endDate"].includes(name)) {
      const date = new Date(value);
      console.log(date);
      setForm((prev) => ({ ...prev, [name]: date }));
      form.setFieldValue(name, date);
      form.validateField(name);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
      form.setFieldValue(name, value);
      form.validateField(name);
    }
  };

  const handleSelect = (formikProps, name, value) => {
    formikProps.setFieldValue(name, value);
    formikProps.setFieldTouched(name, true, false);
    formikProps.validateField(name);
  };
  useEffect(() => {
    console.log(form);
    console.log(data);
  });

  return (
    <div
      style={{
        fontFamily: "sans, Roboto, sans-serif, Helvetica Neue,Arial, ",
        color: "#373A3C",
      }}
    >
      <div className="w-full px-2" style={{ backgroundColor: "#ebf1f5" }}>
        <div className="w-3/5 mx-auto  bg-white relative">
          <div className="text-2xl font-semibold py-4 mx-2">
            <p>Đăng kí chuyến bay</p>
          </div>
          <div className="border border-solid border-slate-200 px-4 rounded-md">
            <Formik
              initialValues={form}
              validationSchema={validationSchema}
              validateOnBlur={true}
              validateOnChange={true}
              onSubmit={(values, { validateForm, setSubmitting }) => {
                handleSubmit();
                setSubmitting(false);
              }}
            >
              {(formikProps) => {
                const { handleSubmit } = formikProps;
                return (
                  <Form onSubmit={handleSubmit}>
                    <div className="py-3 font-semibold py-3 border-b border-solid border-slate-200">
                      Thông tin chuyến bay
                    </div>
                    <div className="flex justify-start items-center border-b border-dashed border-slate-200 py-3">
                      <p className="w-1/2">Tên hãng bay</p>
                      <div
                        className="relative form-group"
                        style={{ width: "45%" }}
                      >
                        <Field
                          type="text"
                          name="flightBrand"
                          value={form.flightBrand || ""}
                          className={`px-2 w-full h-8 border border-solid rounded-md ${formikProps.errors.flightBrand &&
                            formikProps.touched.flightBrand
                            ? "border-red-400 border-2"
                            : ""
                            }`}
                          onChange={(event) => {
                            handleChange(event, formikProps);
                            handleShow("div1", true);
                          }}
                        />
                        <div
                          onClick={() => {
                            handleShow("div1", !show.div1);
                            setFlightBrands(flightBrands2);
                          }}
                        >
                          <KeyboardArrowDownIcon
                            className="fa-solid fa-chevron-down absolute right-3 hover:cursor-pointer"
                            style={{ color: "#0194F3", top: "0.22rem" }}
                          />

                          <ErrorMessage
                            name="flightBrand"
                            component="div"
                            className="text-red-500 <i> italic mt-1 mx-2"
                          />
                        </div>

                        {show.div1 && (
                          <div
                            ref={(el) => (selectRef.current[0] = el)}
                            className="max-h-24 z-10 absolute right-0 top-9 w-full bg-white block border border-solid border-slate-200 rounded-md overflow-y-auto transion-all duration-500 ease-in-out"
                            style={{
                              opacity: 1,
                              transform: "translateY(0)",
                            }}
                          >
                            {flightBrands.length > 0 &&
                              flightBrands.map((brand) => (
                                <div
                                  key={brand.id}
                                  name="flightBrand"
                                  onClick={() => {
                                    setForm({
                                      ...form,
                                      flightBrand: brand.name,
                                    });
                                    handleShow("div1", false);
                                    handleSetData("airplaneBrandId", brand.id);
                                    handleSelect(
                                      formikProps,
                                      "flightBrand",
                                      brand.name
                                    );
                                  }}
                                  className="hover:bg-gray-200 p-2 hover:cursor-pointer"
                                >
                                  {brand.name}
                                </div>
                              ))}
                            {flightBrands.length === 0 && (
                              <p className="hover:bg-gray-200 p-2 hover:cursor-pointer">
                                Không có kết quả cho "
                                <span style={{ color: "#0194F3" }}>
                                  {form.flightBrand}
                                </span>
                                "
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-start items-center border-b border-dashed border-slate-200 py-3">
                      <p className="w-1/2">Vị trí sân bay đi</p>
                      <div className="w-5/12 relative" style={{ width: "45%" }}>
                        <Field
                          type="text"
                          name="fromLocation"

                          className={`px-2 w-full h-8 border border-solid rounded-md  ${formikProps.errors.fromLocation &&
                            formikProps.touched.fromLocation
                            ? "border-red-400 border-2"
                            : ""
                            }`}
                          value={form.fromLocation || ""}
                          onChange={(event) => {
                            handleChange(event, formikProps);
                            handleShow("div2", true);
                          }}
                        />
                        <div
                          onClick={() => {
                            handleShow("div2", !show.div2);
                            setAirportLocationsFrom(airportLocation2);
                          }}
                        >
                          <KeyboardArrowDownIcon
                            className="fa-solid fa-chevron-down absolute right-3 hover:cursor-pointer"
                            style={{ color: "#0194F3", top: "0.22rem" }}
                          />

                          <ErrorMessage
                            name="fromLocation"
                            className="text-red-500 text-sm italic mt-1 mx-2"
                            component="div"
                          />
                        </div>

                        {show.div2 && (
                          <div
                            ref={(el) => (selectRef.current[1] = el)}
                            className="max-h-24 z-10 absolute right-0 top-9 w-full bg-white block border border-solid border-slate-200 rounded-md overflow-y-auto transion-all duration-300 ease-in-out"
                            style={{
                              opacity: show.div2 ? 1 : 0,
                              transform: show.div2
                                ? "translateY(0)"
                                : "translateY(10px)",
                            }}
                          >
                            {airportLocationsFrom.length > 0 &&
                              airportLocationsFrom.map((item) => (
                                <div
                                  key={item.id}
                                  name="fromLocation"
                                  onClick={() => {
                                    setForm({
                                      ...form,
                                      fromLocation: item.name,
                                    });
                                    handleShow("div2", false);
                                    handleSelect(
                                      formikProps,
                                      "fromLocation",
                                      item.name
                                    );
                                    handleSetData(
                                      "fromAirportLocationId",
                                      item.id
                                    );
                                  }}
                                  className="hover:bg-gray-200 p-2 hover:cursor-pointer"
                                >
                                  {item.name}
                                </div>
                              ))}
                            {airportLocationsFrom.length === 0 && (
                              <p className="hover:bg-gray-200 p-2 hover:cursor-pointer">
                                Không có kết quả cho "
                                <span style={{ color: "#0194F3" }}>
                                  {form.fromLocation}
                                </span>
                                "
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-start items-center border-b border-dashed border-slate-200 py-3">
                      <p className="w-1/2">Vị trí sân bay đến</p>
                      <div className="relative" style={{ width: "45%" }}>
                        <Field
                          type="text"
                          placeholder="Nhập sân bay đến"
                          className={`px-2 w-full h-8 border border-solid rounded-md ${formikProps.errors.toLocation &&
                            formikProps.touched.toLocation
                            ? "border-red-400 border-2"
                            : ""
                            }`}
                          value={form.toLocation || ""}
                          name="toLocation"
                          onChange={(event) => {
                            handleChange(event, formikProps);
                            handleShow("div3", true);
                          }}
                        />
                        <div
                          onClick={() => {
                            handleShow("div3", !show.div3);
                            setAirportLocationsTo(airportLocation2);
                          }}
                        >
                          <KeyboardArrowDownIcon
                            className="fa-solid fa-chevron-down absolute right-3 hover:cursor-pointer"
                            style={{ color: "#0194F3", top: "0.22rem" }}
                          />
                          <ErrorMessage
                            name="toLocation"
                            className="text-red-500 text-sm italic mt-1 mx-2"
                            component="div"
                          />
                        </div>

                        {show.div3 && (
                          <div
                            ref={(el) => (selectRef.current[2] = el)}
                            name="toLocation"
                            className="max-h-24 z-10 absolute right-0 top-9 w-full bg-white block border border-solid border-slate-200 rounded-md overflow-y-auto transion-all duration-300 ease-in-out"
                            style={{
                              opacity: show.div3 ? 1 : 0,
                              transform: show.div3
                                ? "translateY(0)"
                                : "translateY(10px)",
                            }}
                          >
                            {airportLocationsTo.length > 0 &&
                              airportLocationsTo.map((item) => (
                                <div
                                  key={item.id}
                                  onClick={() => {
                                    setForm({ ...form, toLocation: item.name });
                                    handleShow("div3", false);
                                    handleSelect(
                                      formikProps,
                                      "toLocation",
                                      item.name
                                    );
                                    handleSetData(
                                      "toAirportLocationId",
                                      item.id
                                    );
                                  }}
                                  className="hover:bg-gray-200 p-2 hover:cursor-pointer"
                                >
                                  {item.name}
                                </div>
                              ))}
                            {airportLocationsTo.length === 0 && (
                              <p className="hover:bg-gray-200 p-2 hover:cursor-pointer">
                                Không có kết quả cho "
                                <span style={{ color: "#0194F3" }}>
                                  {form.toLocation}
                                </span>
                                "
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="border-b border-dashed border-slate-200 py-5 pb-7">
                      <div className="flex justify-start items-center ">
                        <div className="w-1/2">
                          <div className="flex justify-between items-center w-full">
                            <p className="self-center">Thời gian đi</p>
                            <div className="relative">
                              <Field
                                type="text"
                                name="startDate"
                                value={
                                  (form.startDate &&
                                    form.startDate.toLocaleDateString(
                                      "en-GB"
                                    )) ||
                                  ""
                                }
                                onChange={(event) => {
                                  handleChange(event, formikProps);
                                  handleSetData(
                                    "startTime",
                                    new Date(event.target.value).toISOString()
                                  );
                                }}
                                className={`px-2 w-10/12 h-8 border border-solid rounded-md mr-5 text-right pr-10 ${formikProps.errors.startDate &&
                                  formikProps.touched.startDate
                                  ? "border-red-400 border-2"
                                  : ""
                                  }`}
                              />
                              <CalendarIcon
                                style={{ color: "#0194F3" }}
                                className="absolute top-1 right-11 hover:cursor-pointer"
                                onClick={() => {
                                  handleShow("calendar1", !show.calendar1);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="w-1/2">
                          <div className="flex justify-between items-center">
                            <p>Thời gian đến</p>
                            <div className="relative">
                              <Field
                                type="text"
                                name="endDate"
                                value={
                                  (form.endDate &&
                                    form.endDate.toLocaleDateString("en-GB")) ||
                                  ""
                                }
                                onChange={(event) => {
                                  handleChange(event, formikProps);
                                  const endDateValue = new Date(
                                    event.target.value
                                  ).toISOString();

                                  setData((prev) => ({
                                    ...prev,
                                    endTime: endDateValue,
                                  }));
                                }}
                                className={`px-2 w-10/12 h-8 border border-solid rounded-md mr-5 text-right pr-10 startDate ${formikProps.errors.endDate &&
                                  formikProps.touched.endDate
                                  ? "border-red-400 border-2"
                                  : ""
                                  }`}
                              />
                              <CalendarIcon
                                style={{ color: "#0194F3" }}
                                className="absolute top-1 right-11 hover:cursor-pointer"
                                onClick={() => {
                                  handleShow("calendar2", !show.calendar2);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between relative">
                        <ErrorMessage
                          name="startDate"
                          className="text-red-500 text-sm italic w-1/2 mt-1 text-right pr-12 absolute top-0"
                          style={{ left: "" }}
                          component="div"
                        />
                        <ErrorMessage
                          name="endDate"
                          className="text-red-500 text-sm italic mt-1 mx-2 w-1/2 mt-1 text-right pr-12  absolute top-0"
                          style={{ left: "22rem" }}
                          component="div"
                        />
                      </div>
                    </div>
                    <div className="py-3 font-semibold py-3 border-b border-solid border-slate-200">
                      Thông tin ghế
                      {seatError && (
                        <p className="text-red-500 text-sm italic mt-1 font-base">
                          Vui lòng điền thông tin ghế phù hợp
                        </p>
                      )}
                    </div>
                    <div className="flex justify-between pr-10 h-24  border-b border-dashed border-slate-200 py-3">
                      <p className="w-1/3 self-center">Hạng phổ thông</p>
                      <div className="w-2/3">
                        <div className="flex justify-end gap-4 w-full items-center text-sm">
                          <div className="w-1/2">
                            <label>Số lượng: </label>
                            <Field
                              type="number"
                              name="normalSeatQuantity"
                              value={form.normalSeatQuantity || "0"}
                              className={`px-2 w-full h-8 border border-solid rounded-md focus:outline-none focus:border-blue-500 focus:border-2 ${formikProps.errors.normalSeatQuantity &&
                                formikProps.touched.normalSeatQuantity
                                ? "border-red-400 border-2"
                                : ""
                                }`}
                              onChange={(event) => {
                                handleChange(event, formikProps);
                                handleSetData(
                                  "normalSeatQuantity",
                                  parseInt(event.target.value)
                                );
                              }}
                            />
                          </div>
                          <div className="w-1/2">
                            <label>Giá: </label>
                            <Field
                              type="number"
                              name="normalSeatPrice"
                              value={form.normalSeatPrice || "0"}
                              className={`px-2 w-full h-8 border border-solid rounded-md  focus:outline-none focus:border-blue-500 focus:border-2 ${formikProps.errors.normalSeatPrice &&
                                formikProps.touched.normalSeatPrice
                                ? "border-red-400 border-2"
                                : ""
                                }`}
                              onChange={(event) => {
                                handleChange(event, formikProps);
                                handleSetData(
                                  "normalSeatPrice",
                                  parseInt(event.target.value)
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div className="w-full flex justify-between relative">
                          <ErrorMessage
                            name="normalSeatQuantity"
                            component="div"
                            className="text-red-500 text-sm italic mt-1 mx-2 w-1/2 absolute top-0 "
                            style={{ left: "-6px" }}
                          />
                          <ErrorMessage
                            name="normalSeatPrice"
                            component="div"
                            className="text-red-500 text-sm italic mt-1 mx-2 w-1/2 absolute top-0"
                            style={{ left: "14.5rem" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between h-24 pr-10  border-b border-dashed border-slate-200 py-3">
                      <p className="w-1/3 self-center">
                        Hạng phổ thông đặc biệt
                      </p>
                      <div className="w-2/3">
                        <div className="flex justify-end gap-4 w-full items-center text-sm">
                          <div className="w-1/2">
                            <label>Số lượng: </label>
                            <Field
                              type="number"
                              name="specialNormalSeatQuantity"
                              value={form.specialNormalSeatQuantity || "0"}
                              className={`px-2 w-full h-8 border border-solid rounded-md focus:outline-none focus:border-blue-500 focus:border-2 ${formikProps.errors.specialNormalSeatQuantity &&
                                formikProps.touched.specialNormalSeatQuantity
                                ? "border-red-400 border-2"
                                : ""
                                }`}
                              onChange={(event) => {
                                handleChange(event, formikProps);
                                handleSetData(
                                  "specialNormalSeatQuantity",
                                  parseInt(event.target.value)
                                );
                              }}
                            />
                          </div>
                          <div className="w-1/2">
                            <label>Giá: </label>
                            <Field
                              type="number"
                              name="specialNormalSeatPrice"
                              value={form.specialNormalSeatPrice || "0"}
                              className={`px-2 w-full h-8 border border-solid rounded-md  focus:outline-none focus:border-blue-500 focus:border-2 ${formikProps.errors.specialNormalSeatPrice &&
                                formikProps.touched.specialNormalSeatPrice
                                ? "border-red-400 border-2"
                                : ""
                                }`}
                              onChange={(event) => {
                                handleChange(event, formikProps);
                                handleSetData(
                                  "specialNormalSeatPrice",
                                  parseInt(event.target.value)
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div className="w-full flex justify-between relative">
                          <ErrorMessage
                            name="specialNormalSeatQuantity"
                            component="div"
                            className="text-red-500 text-sm italic mt-1 mx-2 w-1/2 absolute top-0"
                            style={{ left: "-6px" }}
                          />
                          <ErrorMessage
                            name="specialNormalSeatPrice"
                            component="div"
                            className="text-red-500 text-sm italic mt-1 mx-2 w-1/2 absolute top-0"
                            style={{ left: "14.5rem" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between pr-10 h-24 border-b border-dashed border-slate-200 py-3">
                      <p className="w-1/3 self-center">Hạng thương gia</p>
                      <div className="w-2/3">
                        <div className="flex justify-end gap-4 w-full items-center text-sm">
                          <div className="w-1/2">
                            <label>Số lượng: </label>
                            <Field
                              type="number"
                              name="businessSeatQuantity"
                              value={form.businessSeatQuantity || "0"}
                              className={`px-2 w-full h-8 border border-solid rounded-md focus:outline-none focus:border-blue-500 focus:border-2
                            ${formikProps.errors.businessSeatQuantity &&
                                  formikProps.touched.businessSeatQuantity
                                  ? "border-red-400 border-2"
                                  : ""
                                }`}
                              onChange={(event) => {
                                handleChange(event, formikProps);
                                handleSetData(
                                  "businessSeatQuantity",
                                  parseInt(event.target.value)
                                );
                              }}
                            />
                          </div>

                          <div className="w-1/2">
                            <label>Giá: </label>
                            <Field
                              type="number"
                              name="businessSeatPrice"
                              value={form.businessSeatPrice || "0"}
                              className={`px-2 w-full h-8 border border-solid rounded-md  focus:outline-none focus:border-blue-500 focus:border-2  ${formikProps.errors.businessSeatPrice &&
                                formikProps.touched.businessSeatPrice
                                ? "border-red-400 border-2"
                                : ""
                                }`}
                              onChange={(event) => {
                                handleChange(event, formikProps);
                                handleSetData(
                                  "businessSeatPrice",
                                  parseInt(event.target.value)
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div className="w-full flex justify-between relative">
                          <ErrorMessage
                            name="businessSeatQuantity"
                            component="div"
                            className="text-red-500 text-sm italic mt-1 mx-2 w-1/2 absolute top-0"
                            style={{ left: "-6px" }}
                          />
                          <ErrorMessage
                            name="businessSeatPrice"
                            component="div"
                            className="text-red-500 text-sm italic mt-1 mx-2 w-1/2 absolute top-0"
                            style={{ left: "14.5rem" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between pr-10  mb-2 py-3">
                      <p className="w-1/3 self-center">Hạng nhất</p>
                      <div className="w-2/3">
                        <div className="flex justify-end gap-4 w-full items-center text-sm">
                          <div className="w-1/2 h-full">
                            <label>Số lượng: </label>
                            <Field
                              type="number"
                              name="vipSeatQuantity"
                              value={form.vipSeatQuantity || "0"}
                              className={`px-2 w-full h-8 border border-solid rounded-md focus:outline-none focus:border-blue-500 focus:border-2  ${formikProps.errors.vipSeatQuantity &&
                                formikProps.touched.vipSeatQuantity
                                ? "border-red-400 border-2"
                                : ""
                                }`}
                              onChange={(event) => {
                                handleChange(event, formikProps);
                                handleSetData(
                                  "vipSeatQuantity",
                                  parseInt(event.target.value)
                                );
                              }}
                            />
                          </div>
                          <div className="w-1/2">
                            <label>Giá: </label>
                            <Field
                              type="number"
                              name="vipSeatPrice"
                              value={form.vipSeatPrice || "0"}
                              className={`px-2 w-full h-8 border border-solid rounded-md  focus:outline-none focus:border-blue-500 focus:border-2 ${formikProps.errors.vipSeatPrice &&
                                formikProps.touched.vipSeatPrice
                                ? "border-red-400 border-2"
                                : ""
                                }`}
                              onChange={(event) => {
                                handleChange(event, formikProps);
                                handleSetData(
                                  "vipSeatPrice",
                                  parseInt(event.target.value)
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between w-full gap-4 relative">
                          <ErrorMessage
                            name="vipSeatQuantity"
                            component="div"
                            className="text-red-500 text-sm italic mt-1 mx-2 w-1/2 absolute top-0"
                            style={{ left: "-6px" }}
                          />
                          <ErrorMessage
                            name="vipSeatPrice"
                            component="div"
                            className="text-red-500 text-sm italic mt-1 mx-2 w-1/2 absolute top-0"
                            style={{ left: "14.5rem" }}
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className="mx-4 text-white rounded-md mt-4 w-1/3 mx-auto mb-5 mt-6"
                      style={{ backgroundColor: "rgb(255, 94, 31)" }}
                    >
                      <button
                        type="submit"
                        className="text-center w-full text-lg font-semibold py-2 hover:cursor-pointer hover:bg-orange-600 hover:rounded-lg transition duration-300 ease-in-out"
                        disabled={formikProps.isSubmitting}
                        onClick={() => {
                          console.log(form);
                        }}
                      >
                        Đăng ký chuyến bay
                      </button>
                    </div>

                    {show.calendar1 && (
                      <div
                        className="absolute border border-solid border-slate-200 rounded-lg bg-white max-w-fit hover:border-slate-300 transition-all duration-300 ease-in-out"
                        style={{
                          top: "330px",
                          left: "20px",
                          opacity: show.calendar1 ? 1 : 0,
                          transform: show.calendar1
                            ? "translateY(0)"
                            : "translateY(10px)",
                        }}
                      >
                        <Calendar
                          maxHeight="290px"
                          date={(data) => {
                            setForm({
                              ...form,
                              startDate: data,
                            });
                            setData((prev) => ({
                              ...prev,
                              startTime: convertDate(data).toISOString(),
                            }));
                            handleShow("calendar1", false);
                            handleShow("calendar1", !show.calendar1);
                            formikProps.setFieldValue("startDate", data);
                            formikProps.setFieldTouched(
                              "startDate",
                              true,
                              false
                            ); // Mark field as touched
                            formikProps.validateField("startDate");
                          }}
                        />{" "}
                      </div>
                    )}
                    {show.calendar2 && (
                      <div
                        className="absolute border border-solid border-slate-200 rounded-lg bg-white max-w-fit hover:border-slate-300 transition-all duration-300 ease-in-out"
                        style={{
                          top: "330px",
                          right: "60px",
                          opacity: show.calendar2 ? 1 : 0,
                          transform: show.calendar2
                            ? "translateY(0)"
                            : "translateY(10px)",
                        }}
                      >
                        <Calendar
                          maxHeight="290px"
                          date={(data) => {
                            setForm({
                              ...form,
                              endDate: data,
                            });
                            setData((prev) => ({
                              ...prev,
                              endTime: convertDate(data).toISOString(),
                            }));
                            handleShow("calendar2", false);
                            formikProps.setFieldValue("endDate", data);
                            formikProps.setFieldTouched("endDate", true, false); // Mark field as touched
                            formikProps.validateField("endDate");
                          }}
                        />{" "}
                      </div>
                    )}
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FightTeraForm;
