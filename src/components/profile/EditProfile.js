import React, { useEffect, useState } from "react";
import EditTable from "./EditTable";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../config/privateAxios";
import {
  getCustomer,
  selectCustomer,
} from "../../redux/features/customerSlice";
import { useParams } from "react-router-dom";

function EditProfile() {
  const dispatch = useDispatch();
  const customer = useSelector(getCustomer);

  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    date: "",
    month: "",
    year: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/customers`);
        dispatch(getCustomer(response.data));
        setFormData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dispatch, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="edit-profile mx-auto w-3/5 mt-5">
      <div className="flex gap 5">
        <EditTable />
        <div className="right-content w-4/5 pl-5">
          <div className="flex flex-col justify-between pb-4">
            <h1 className="font-bold text-2xl mt-2">Dữ liệu cá nhân</h1>
          </div>
          <form>
            <div className="mt-2 bg-gray rounded-lg border-solid border-2 border-gray-200">
              <div className="ms-2 my-3">
                <div className="px-2 me-2">
                  <label className="text-sm leading-6 text-gray-900">Tên</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="shadow border outline-none rounded-md w-full py-2 px-3 text-gray-700 focus:border-[#6A64F1] focus:shadow-md"
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
                        Giới tính
                      </label>
                      <input
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        id="gender"
                        className="shadow w-full rounded-md border py-2 px-3 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>

                  <div className="w-full px-3 sm:w-1/4">
                    <div className="mb-5">
                      <label
                        htmlFor="lName"
                        className="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Ngày sinh
                      </label>

                      <input
                        type="text"
                        name="date"
                        id="lName"
                        value={formData.date}
                        onChange={handleChange}
                        className="shadow w-full rounded-md border py-2 px-3 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>

                  <div className="w-full px-3 sm:w-1/4">
                    <div className="mt-9">
                      <input
                        type="text"
                        name="month"
                        id="lName"
                        value={formData.month}
                        onChange={handleChange}
                        className="shadow w-full rounded-md border py-2 px-3 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>

                  <div className="w-full px-3 sm:w-1/4">
                    <div className="mt-9">
                      <input
                        type="text"
                        name="year"
                        id="lName"
                        value={formData.year}
                        onChange={handleChange}
                        className="shadow w-full rounded-md border py-2 px-3 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
          <button
            type="submit"
            className="w-full mt-7 h-10 font-bold text-white rounded-lg shadow-md hover:bg-blue-500 bg-sky-600"
          >
            Thêm hành khách
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
