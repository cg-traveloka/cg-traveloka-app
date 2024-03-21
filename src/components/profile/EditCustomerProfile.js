import React from "react";
import EditTable from "./EditTable";

function EditCustomerProfile() {
  return (
    <div className="mx-auto my-auto w-7/12 pt-5">
      <div className="flex gap 4">
        <EditTable />
        <div className="right-content w-4/5 pl-6 ">
          <div className="flex flex-col justify-between pb-4">
            <h1 className="font-bold text-2xl mt-2">Danh sách hành khách</h1>
            <p className="font-medium mt-3">
              Bạn có thể lưu tối đa thông tin 20 hành khách
            </p>
          </div>

          <div className="mt-5 bg-gray rounded-lg border-solid border-2 border-gray-200">
            <div className="ms-2 my-3">
              <div className="px-2 me-2">
                <label className="text-sm leading-6 text-gray-900">Tên</label>

                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="shadow border outline-none rounded-md w-full py-2 px-3 text-gray-700 focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>

              <div className="mt-5 px-2 flex">
                <div class="w-full sm:w-1/3">
                  <div class="mb-5">
                    <label
                      for="gender"
                      class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Giới tính
                    </label>
                    <input
                      type="text"
                      name="gender"
                      id="gender"
                      class="shadow w-full rounded-md border py-2 px-3 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>

                <div class="w-full px-3 sm:w-1/4">
                  <div class="mb-5">
                    <label
                      for="lName"
                      class="mb-3 block text-base font-medium text-[#07074D]"
                    >
                      Ngày sinh
                    </label>

                    <input
                      type="text"
                      name="lName"
                      id="lName"
                      class="shadow w-full rounded-md border py-2 px-3 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>

                <div class="w-full px-3 sm:w-1/4">
                  <div class="mt-9">
                    <input
                      type="text"
                      name="lName"
                      id="lName"
                      class="shadow w-full rounded-md border py-2 px-3 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>

                <div class="w-full px-3 sm:w-1/4">
                  <div class="mt-9">
                    <input
                      type="text"
                      name="lName"
                      id="lName"
                      class="shadow w-full rounded-md border py-2 px-3 text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                  </div>
                </div>
              </div>

              <hr className="ms-2 me-5 mt-3 border border-gray-200" />

              <div className="mt-5 me-5 flex justify-end items-center gap-5">
                <button
                  type="button"
                  class="text-lg rounded-md text-sky-600 font-bold leading-6 px-3 py-2 bg-gray-100 hover:bg-gray-200"
                >
                  Huỷ
                </button>

                <button
                  type="submit"
                  class="rounded-md bg-sky-600 px-3 py-2 text-lg font-bold text-white shadow-md hover:bg-blue-500 "
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCustomerProfile;
