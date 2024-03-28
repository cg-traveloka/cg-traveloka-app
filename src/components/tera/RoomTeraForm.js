import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useRef } from "react";
import axios from "axios";
import { Checkbox, Grid, Card, CardMedia } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { toast } from "react-toastify";

function RoomTeraForm({ sendSubmitStatus }) {
  const [form, setForm] = useState({
    hotelId: 0,
    roomTypeId: 0,
    quantity: 0,
    unitPriceOrigin: 0,
    unitPriceSell: 0,
    maxPerson: 0,
    size: 0,
    bedTypeId: 0,
    roomUtilityId: [],
    images: [],
  });

  const [show, setShow] = useState({
    div1: false,
    div2: false,
    div3: false,
    div4: false,
    div5: false,
    div6: false,
  });

  const [roomTypes, setRoomTypes] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [bedTypes, setBedTypes] = useState([]);
  const [roomUtilityTypes, setRoomUtilityTypes] = useState([]);
  const [utilityList, setUtilityList] = useState([]);

  const [imagePreviews, setImagePreviews] = useState([]);

  const [checked, setChecked] = useState([]);

  const handleChangeCheckbox = (row, col) => {
    console.log("row", row);
    console.log("col", col);
    const newChecked = checked.map((rowItem, rowIndex) =>
      rowIndex === row
        ? rowItem.map((colItem, colIndex) =>
            colIndex === col ? !colItem : colItem
          )
        : rowItem
    );
    console.log("newChecked", newChecked);
    setChecked(newChecked);
  };

  const handleShow = (key, value) => {
    setShow({ ...show, [key]: value });
  };

  const handleSubmit = (values, { resetForm }) => {
    sendSubmitStatus(true);
    axios
      .post("http://localhost:8080/api/rooms", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        // toast.success("Đăng ký phòng thành công");
        alert("Đăng ký phòng thành công");
        sendSubmitStatus(false);
        resetForm();
        setChecked(Array(roomUtilityTypes.length).fill([]));
        setImagePreviews([]);
      })
      .catch((error) => {
        // toast.error("Đăng ký phòng thất bại");
        alert("Đăng ký phòng thất bại");
        sendSubmitStatus(false);
        console.log(error);
      });
  };
  const validationSchema = Yup.object().shape({
    hotel: Yup.string().required("Tên khách sạn không được để trống"),
    roomType: Yup.string().required("Loại phòng không được để trống"),
    quantity: Yup.number()
      .required("Số lượng không được để trống")
      .min(1, "Số lượng phải lớn hơn 0"),
    unitPriceOrigin: Yup.number()
      .required("Giá không được để trống")
      .min(1, "Giá phải lớn hơn 0"),
    unitPriceSell: Yup.number()
      .required("Giá không được để trống")
      .test("is-required", "Giá bán phải lớn hơn giá gốc", (value) => {
        return value > form.unitPriceOrigin;
      }),
    maxPerson: Yup.number()
      .required("Số người tối đa không được để trống")
      .min(1, "Số người tối đa phải lớn hơn 0"),
    size: Yup.number()
      .required("Diện tích không được để trống")
      .typeError("Diện tích phải là một số")
      .min(0.000001, "Diện tích phải lớn hơn 0"),
    bedType: Yup.string().required("Loại giường không được để trống"),
    roomUtilities: Yup.array()
      .required("Tiện ích không được để trống")
      .test("is-required", "Chọn ít nhất một tiện ích", (value) => {
        return value.length > 0;
      }),
    images: Yup.array()
      .required("Hình ảnh không được để trống")
      .test("is-iamge", "Chứa file không phải hình ảnh", (value) => {
        if (!value) return true;
        return value.every((file) => file.type.startsWith("image/"));
      })
      .min(7, "Chọn ít nhất 7 hình ảnh"),
  });

  const handleFileChange = () => {
    const selectedFiles = form.images;
    console.log("form image", form.images);
    const previews = [];
    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        previews.push(reader.result);
        setImagePreviews([...previews]);
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    handleFileChange();
  }, [form.images]);

  const initialValues = {
    ...form,
    hotel: null,
    roomType: null,
    bedType: null,
    roomUtilities: [],
  };
  const formikProps = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const { errors, touched, values, handleChange, handleBlur } = formikProps;

  const fetchRoomUtil = (index, id) => {
    axios.get(`http://localhost:8080/api/room-utilities/${id}`).then((res) => {
      const newUtilityList = utilityList.map((item, idx) => {
        return idx === index ? res.data : item;
      });
      const newChecked = checked.map((item, idx) => {
        return idx === index ? Array(res.data.length).fill(false) : item;
      });
      console.log("newUtilityList", newUtilityList);
      setUtilityList(newUtilityList);
      setChecked(newChecked);
    });
  };

  useEffect(() => {
    console.log("form", form);
    console.log("values", values);
    console.log("errors", errors);
  }, [form]);
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
            div4: false,
            div5: false,
            div6: false,
          });
        }
      }
    }

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    console.log("checked", checked);
    const updatedUtilities = checked
      .map((row, rowIndex) =>
        row.map((isChecked, colIndex) =>
          isChecked ? utilityList[rowIndex][colIndex].id : null
        )
      )
      .flat()
      .filter((id) => id !== null);
    setForm({
      ...form,
      utilitiesId: updatedUtilities,
    });

    setForm({
      ...form,
      roomUtilityId: updatedUtilities,
    });
    formikProps.setFieldValue("roomUtilities", updatedUtilities);
    formikProps.validateField("roomUtilities");
  }, [checked]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await axios.get(
          "http://localhost:8080/api/hotels/partner?partnerId=1"
        );
        console.log("hotels", res1.data);
        setHotels(res1.data);
        if (res1.data.length > 0) {
          formikProps.setFieldValue("hotel", res1.data[0].name);
          setForm((prevForm) => ({ ...prevForm, hotelId: res1.data[0].id }));
        }

        const res2 = await axios.get("http://localhost:8080/api/room-types");
        console.log("room types", res2.data);
        setRoomTypes(res2.data);
        if (res2.data.length > 0) {
          formikProps.setFieldValue("roomType", res2.data[0].name);
          setForm((prevForm) => ({ ...prevForm, roomTypeId: res2.data[0].id }));
        }

        const res3 = await axios.get("http://localhost:8080/api/bed-types");
        console.log("bed types", res3.data);
        setBedTypes(res3.data);
        if (res3.data.length > 0) {
          formikProps.setFieldValue("bedType", res3.data[0].name);
          setForm((prevForm) => ({ ...prevForm, bedTypeId: res3.data[0].id }));
        }

        const res4 = await axios.get(
          "http://localhost:8080/api/room-utility-types"
        );
        console.log("room util type", res4.data);
        setRoomUtilityTypes(res4.data);
        setUtilityList(Array(res4.data.length).fill([]));
        setChecked(Array(res4.data.length).fill([]));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full px-2" style={{ backgroundColor: "#ebf1f5" }}>
      <div className="w-3/5 mx-auto  bg-white relative">
        <div className="w-full mx-auto">
          <div className="w-full border mx-auto border-solid border-slate-200 pr-2 pl-4">
            <form onSubmit={formikProps.handleSubmit} className="my-4">
              <div className="font-bold text-2xl mb-4 ml-1">Đăng ký phòng</div>
              <div className="w-full border-t border-solid border-slate-200">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <label htmlFor="hotel">
                      Tên khach sạn
                      <span className="text-blue-300 text-center self-center">
                        *
                      </span>
                    </label>
                    <div className="border border-solid border-slate-200  w-64 text-start h-8 mr-14 pt-1 px-2 rounded-md">
                      <div className="flex items-center justitfy-between">
                        <div className="w-1/2">{values.hotel || ""}</div>
                        <div
                          onClick={() => {
                            handleShow("div1", !show.div1);
                          }}
                          className="w-1/2 text-end"
                        >
                          <KeyboardArrowDownIcon
                            className="hover:cursor-pointer"
                            style={{ color: "#0194F3" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {show.div1 && (
                    <div
                      ref={(el) => (selectRef.current[0] = el)}
                      className="absolute  rounded-md z-10 bg-white border border-solid border-slate-200 w-64 max-h-20 overflow-y-scroll"
                      style={{ right: "5rem", top: "7.6rem" }}
                    >
                      {hotels.map((item) => (
                        <div
                          onClick={() => {
                            formikProps.setFieldValue("hotel", item.name);
                            formikProps.validateField("hotel");
                            setForm({ ...form, hotelId: item.id });
                            setShow({ ...show, div1: false });
                          }}
                          className="px-2 py-1 hover:cursor-pointer hover:bg-slate-100"
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    {errors.hotel && touched.hotel && (
                      <div className="text-red-400 italic text-sm w-full mt-1">
                        <p
                          className="text-end"
                          style={{ marginRight: "5.4rem" }}
                        >
                          {errors.hotel}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full relative">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <label htmlFor="roomType">
                      Loại phòng
                      <span className="text-blue-300 text-center self-center">
                        *
                      </span>
                    </label>
                    <div className="border border-solid border-slate-200  w-64 text-start h-8 mr-14 pt-1 px-2 rounded-md">
                      <div className="flex items-center justitfy-between">
                        <div className="w-1/2">{values.roomType || ""}</div>
                        <div
                          onClick={() => {
                            handleShow("div2", !show.div2);
                          }}
                          className="w-1/2 text-end"
                        >
                          <KeyboardArrowDownIcon
                            className="hover:cursor-pointer"
                            style={{ color: "#0194F3" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {show.div2 && (
                    <div
                      ref={(el) => (selectRef.current[1] = el)}
                      className="absolute top-14 rounded-md z-10 bg-white border border-solid border-slate-200 w-64 max-h-20 overflow-y-scroll"
                      style={{ right: "4.4rem" }}
                    >
                      {roomTypes.map((item) => (
                        <div
                          onClick={() => {
                            formikProps.setFieldValue("roomType", item.name);
                            formikProps.validateField("roomType");
                            setForm({ ...form, roomTypeId: item.id });
                            setShow({ ...show, div2: false });
                          }}
                          className="px-2 py-1 hover:cursor-pointer hover:bg-slate-100"
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    {errors.roomType && touched.roomType && (
                      <div className="text-red-400 italic text-sm w-full mt-1">
                        <p
                          className="text-end"
                          style={{ marginRight: "6.6rem" }}
                        >
                          {errors.roomType}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full relative">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <label htmlFor="roomType">
                      Loại giường
                      <span className="text-blue-300 text-center self-center">
                        *
                      </span>
                    </label>
                    <div className="border border-solid border-slate-200  w-64 text-start h-8 mr-14 pt-1 px-2 rounded-md">
                      <div className="flex items-center justitfy-between">
                        <div className="w-1/2">{values.bedType || ""}</div>
                        <div
                          onClick={() => {
                            handleShow("div3", !show.div3);
                          }}
                          className="w-1/2 text-end"
                        >
                          <KeyboardArrowDownIcon
                            className="hover:cursor-pointer"
                            style={{ color: "#0194F3" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {show.div3 && (
                    <div
                      ref={(el) => (selectRef.current[2] = el)}
                      className="absolute top-14 rounded-md z-10 bg-white border border-solid border-slate-200 w-64 max-h-20 overflow-y-scroll"
                      style={{ right: "4.4rem" }}
                    >
                      {bedTypes.map((item) => (
                        <div
                          onClick={() => {
                            formikProps.setFieldValue("bedType", item.name);
                            formikProps.validateField("bedType");
                            setForm({ ...form, bedTypeId: item.id });
                            setShow({ ...show, div3: false });
                          }}
                          className="px-2 py-1 hover:cursor-pointer hover:bg-slate-100"
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    {errors.bedType && touched.bedType && (
                      <div className="text-red-400 italic text-sm w-full mt-1">
                        <p
                          className="text-end"
                          style={{ marginRight: "6.4rem" }}
                        >
                          {errors.bedType}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full ">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <label htmlFor="quantity">
                      Số lượng
                      <span className="text-blue-300 text-center self-center">
                        *
                      </span>
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      id="quantity"
                      value={values.quantity || "0"}
                      onChange={(event) => {
                        handleChange(event);
                        setForm({
                          ...form,
                          quantity: parseInt(event.target.value),
                        });
                      }}
                      onBlur={handleBlur}
                      className="px-2 border border-solid border-slate-200 w-64 mr-14 h-8 rounded-md text-right"
                    />
                  </div>
                  <div>
                    {errors.quantity && touched.quantity && (
                      <div className="text-red-400 italic text-sm w-full mt-1">
                        <p
                          className="text-end"
                          style={{ marginRight: "10rem" }}
                        >
                          {errors.quantity}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full ">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <label htmlFor="unitPriceOrigin">
                      Giá gốc
                      <span className="text-blue-300 text-center self-center">
                        *
                      </span>
                    </label>
                    <input
                      type="number"
                      name="unitPriceOrigin"
                      id="unitPriceOrigin"
                      value={values.unitPriceOrigin || "0"}
                      onChange={(event) => {
                        handleChange(event);
                        setForm({
                          ...form,
                          unitPriceOrigin: parseInt(event.target.value),
                        });
                      }}
                      onBlur={handleBlur}
                      className="px-2 border border-solid border-slate-200 w-64 mr-14 h-8 rounded-md text-right"
                    />
                  </div>
                  <div>
                    {errors.unitPriceOrigin && touched.unitPriceOrigin && (
                      <div className="text-red-400 italic text-sm w-full mt-1">
                        <p
                          className="text-end"
                          style={{ marginRight: "12.2rem" }}
                        >
                          {errors.unitPriceOrigin}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full ">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <label htmlFor="unitPriceSell">
                      Đơn giá bán
                      <span className="text-blue-300 text-center self-center">
                        *
                      </span>
                    </label>
                    <input
                      type="number"
                      name="unitPriceSell"
                      id="unitPriceSell"
                      value={values.unitPriceSell || "0"}
                      onChange={(event) => {
                        handleChange(event);
                        setForm({
                          ...form,
                          unitPriceSell: parseInt(event.target.value),
                        });
                      }}
                      onBlur={handleBlur}
                      className="px-2 border border-solid border-slate-200 w-64 mr-14 h-8 rounded-md text-right"
                    />
                  </div>
                  <div>
                    {errors.unitPriceSell && touched.unitPriceSell && (
                      <div className="text-red-400 italic text-sm w-full mt-1">
                        <p
                          className="text-end"
                          style={{ marginRight: "8.1rem" }}
                        >
                          {errors.unitPriceSell}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full ">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <label htmlFor="maxPerson">
                      Số người tối đa
                      <span className="text-blue-300 text-center self-center">
                        *
                      </span>
                    </label>
                    <input
                      type="number"
                      name="maxPerson"
                      id="maxPerson"
                      value={values.maxPerson || "0"}
                      onChange={(event) => {
                        handleChange(event);
                        setForm({
                          ...form,
                          maxPerson: parseInt(event.target.value),
                        });
                      }}
                      onBlur={handleBlur}
                      className="px-2 border border-solid border-slate-200 w-64 mr-14 h-8 rounded-md text-right"
                    />
                  </div>
                  <div>
                    {errors.maxPerson && touched.maxPerson && (
                      <div className="text-red-400 italic text-sm w-full mt-1">
                        <p
                          className="text-end"
                          style={{ marginRight: "7.6rem" }}
                        >
                          {errors.maxPerson}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full ">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <label htmlFor="size">
                      Diện tích
                      <span className="text-blue-300 text-center self-center">
                        *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="size"
                      id="size"
                      value={values.size || ""}
                      onChange={(event) => {
                        handleChange(event);
                        setForm({
                          ...form,
                          size: parseFloat(event.target.value),
                        });
                      }}
                      onBlur={handleBlur}
                      className="px-6 border border-solid border-slate-200 w-64 mr-14 h-8 rounded-md text-right"
                    />
                  </div>
                  <div>
                    {errors.size && touched.size && (
                      <div className="text-red-400 italic text-sm w-full mt-1">
                        <p
                          className="text-end"
                          style={{ marginRight: "10rem" }}
                        >
                          {errors.size}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full relative">
                <div className="mx-4 pt-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <label htmlFor="roomUtilities">
                      Tiện ích
                      <span className="text-blue-300 text-center self-center">
                        *
                      </span>
                    </label>
                    <div>
                      {errors.roomUtilities && touched.roomUtilities && (
                        <div className="text-red-400 italic text-sm w-full mt-1">
                          <p
                            className="text-end"
                            style={{ marginRight: "9.8rem" }}
                          >
                            {errors.roomUtilities}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  {roomUtilityTypes.map((item, index) => (
                    <div className="relative" key={item.id}>
                      <div
                        className={`flex justify-between items-center  px-4 py-4 ${
                          index !== roomUtilityTypes.length - 1
                            ? "border-b border-dotted border-slate-200"
                            : ""
                        }`}
                      >
                        <p>{item.name}</p>
                        <div className="px-10">
                          <span>Lựa chọn tiện ích | </span>
                          <span style={{ color: "rgb(87, 167, 237" }}>
                            Mở rộng{" "}
                          </span>
                          <span
                            onClick={() => {
                              console.log("div", `div${index + 4}`);
                              fetchRoomUtil(index, item.id);
                              handleShow(
                                `div${index + 4}`,
                                !show[`div${index + 4}`]
                              );
                            }}
                          >
                            <KeyboardArrowDownIcon
                              className="hover:cursor-pointer"
                              style={{ color: "#0194F3" }}
                            />
                          </span>
                        </div>
                      </div>
                      {show[`div${index + 4}`] && (
                        <div className="z-10 bg-white text-gray-500">
                          {utilityList[index].map((item, id) => (
                            <p
                              key={id}
                              className="max-h-max flex items-center hover:cursor-pointer  px-4 py-1 border-b border-dotted border-slate-200"
                              onClick={() => {
                                handleChangeCheckbox(index, id);
                              }}
                            >
                              <span>
                                {" "}
                                <Checkbox
                                  checked={checked[index][id]}
                                  onChange={() =>
                                    handleChangeCheckbox(index, id)
                                  }
                                  sx={{
                                    color: "#0194F3",
                                    "&.Mui-checked": {
                                      color: "#0194F3",
                                    },
                                  }}
                                />
                              </span>
                              <span>{item.name}</span>
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full">
                <div className="mx-4 py-4 border-b border-dashed border-slate-200">
                  <div className=" flex justify-between items-center ">
                    <p>
                      Hình ảnh phòng
                      <span className="text-blue-300 text-center self-center">
                        *
                      </span>
                    </p>
                    <label htmlFor="images" className="custom-file-button">
                      Chọn ảnh
                    </label>
                    <input
                      type="file"
                      name="images"
                      id="images"
                      multiple
                      onChange={(event) => {
                        const uploadedFiles = Array.from(event.target.files);
                        formikProps.setFieldValue("images", [
                          ...uploadedFiles,
                          ...form.images,
                        ]);
                        formikProps.validateField("images");

                        if (!errors.images?.min) {
                          setForm((prevForm) => ({
                            ...prevForm,
                            images: [...prevForm.images, ...uploadedFiles],
                          }));
                        }
                      }}
                      onBlur={handleBlur}
                      className=" px-2 absolute border border-solid border-slate-200 w-64 mr-14 h-12 rounded-md"
                      style={{ left: "-9999px" }}
                    />
                    <style jsx="true">{`
                      .custom-file-button {
                        display: inline-block;
                        cursor: pointer;
                        padding: 0.5rem 1rem;
                        background-color: #4a90e2;
                        color: #fff;
                        border: none;
                        border-radius: 4px;
                        font-size: 1rem;
                        margin-right: 9rem;
                      }

                      /* Style the file input label to look like a button */
                      .custom-file-button:hover {
                        background-color: #357bd8;
                      }
                    `}</style>
                  </div>
                  <div className="w-full">
                    <div
                      className="ml-60 mt-2"
                      style={{ marginLeft: "19rem", width: "50%" }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2 pl-4">
                        {imagePreviews.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt="preview"
                            className="w-full h-auto"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    {errors.images && touched.images && (
                      <div className="text-red-400 italic text-sm w-full">
                        <p
                          className="text-end"
                          style={{ marginRight: "9.8rem" }}
                        >
                          {errors.images}
                        </p>
                      </div>
                    )}
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
                  Đăng ký phòng
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomTeraForm;
