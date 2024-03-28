import React from "react";
import { Link } from "react-router-dom";
import EditProfileContent1 from "../../components/profile/EditTable";
import EditProfileContent2 from "../../components/profile/EditBonus";

function EditProfileBonus() {
  return (
    <div className="mx-auto my-auto w-4/5 pt-5">
      <div className="flex gap 4">
        <EditProfileContent1 />
        <EditProfileContent2 />
      </div>
    </div>
  );
}
export default EditProfileBonus;
