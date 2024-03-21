import React from "react";
import "../../style/scss/main.scss";
import EditTable from "./EditTable";

function EditCustomerInformationSaved() {
  return (
    <div className="mx-auto my-auto w-7/12 pt-5">
      <div className="flex gap 4">
        <EditTable />
        <div class="passenger-list">
          <h2>Danh sách hành khách</h2>
          <p>Bạn có thể lưu tối đa thông tin 20 hành khách</p>
          <div class="passenger">
            <div className="picture">
              <img
                src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/d/d84dda4ae99f70460825cb810aa2968a.svg"
                alt="customer-icon"
              />
            </div>
            <span>1. Việt Vũ</span>
            <button class="edit">Chỉnh sửa</button>
            <button class="remove">Gỡ bỏ</button>
          </div>

          <button class="add-passenger">Thêm hành khách</button>
        </div>
      </div>
    </div>
  );
}

export default EditCustomerInformationSaved;
