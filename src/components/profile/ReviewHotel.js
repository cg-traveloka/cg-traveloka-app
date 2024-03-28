import React from "react";
import EditTable from "./EditTable";
import axios from "../../config/privateAxios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useParams } from "react-router-dom";

function ReviewHotel() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    ratingPoint: 1,
    comment: "",
    images: [],
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("contractId", id);
    formDataToSend.append("ratingPoint", formData.ratingPoint);
    formDataToSend.append("comment", formData.comment);
    Array.from(formData.images).forEach((image, index) => {
      formDataToSend.append(`images[${index}]`, image);
    });

    axios
      .post("/api/review", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Đánh giá đã được gửi", response.data);
      })
      .catch((error) => {
        toast.error("Đánh giá không thành công", error);
      });
  };

  return (
    <div className="edit-profile mx-auto my-auto w-8/12 pt-5">
      <div className="flex gap-3">
        <EditTable />
        <div className="right-content w-4/5 pl-5 font-sans">
          <div className="flex flex-col justify-between pb-4">
            <h1 className="font-bold text-2xl mt-2">Đánh giá khách sạn</h1>
            <p className="font-medium mt-3">
              Bạn chỉ có thể đánh giá khách sạn sau khi đã đặt phòng
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mt-2 bg-gray rounded-lg border-solid border-2 border-gray-200 font-sans">
              <div className="ms-2 my-3">
                <div className="px-2 me-2">
                  <label className="text-base leading-6 text-gray-900">
                    Bạn có nhận xét gì về khách sạn chúng tôi ?
                  </label>
                  <div className="mt-3">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.comment}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          comment: event.target.value,
                        })
                      }
                      className="shadow border outline-none rounded-md h-16 w-full px-3 text-gray-700 focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>

                <div className="mt-5 px-2 flex">
                  <div className="w-full sm:w-1/3">
                    <div className="mb-5">
                      <label
                        htmlFor="gender"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Điểm đánh giá
                      </label>

                      <select
                        id="point"
                        name="point"
                        className="shadow-md w-16 rounded-md border-2 border-solid   py-2 px-3 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        value={formData.ratingPoint}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            ratingPoint: Number(event.target.value),
                          })
                        }
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                  </div>

                  <div className="w-full px-3 sm:w-2/4">
                    <div className="mb-5">
                      <label
                        htmlFor="lName"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Hình ảnh
                      </label>

                      <input
                        type="file"
                        name="image"
                        id="image"
                        className="shadow w-full rounded-md border py-2 px-3 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        multiple
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            images: event.target.files,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>

                <hr className="ms-2 me-5 mt-3 border border-gray-200" />

                <div className="mt-5 me-5 flex justify-end items-center gap-5">
                  <button
                    type="button"
                    className="text-lg rounded-md text-sky-600 font-bold leading-6 px-3 py-2 bg-gray-100 hover:bg-gray-200"
                  >
                    Huỷ
                  </button>

                  <button
                    type="submit"
                    className="rounded-md bg-sky-600 px-3 py-2 text-lg font-bold text-white shadow-md hover:bg-blue-500 "
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReviewHotel;
