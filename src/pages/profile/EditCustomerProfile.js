import React from "react";
import EditTable from "../../components/profile/EditTable";
import EditProfile from "../../components/profile/EditProfile";

function EditCustomerProfile() {
  return (
    <div className="mx-auto my-auto w-7/12 pt-5">
      <div className="flex gap 4">
        <EditTable />
        <EditProfile />
      </div>
    </div>
  );
}

export default EditCustomerProfile;
