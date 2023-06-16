import React from "react";
import { useSelector } from "react-redux";
import { truncateString } from "../../../utils/helper-function/convert";
import anon_avatar from "../../../assets/anon_avatar.png";

const CurrentUser = () => {
  const { currentData } = useSelector((state) => state.auth);
  return (
    <div className="flex items-center gap-2">
      <img
        src={currentData?.avatar || anon_avatar}
        alt="avatar"
        className="w-10 object-cover rounded-full h-10  border-white border-2 shadow-md"
      />
      <div className="flex flex-col">
        <span>
          Xin chào, <span className="font-semibold">{currentData?.name}</span>
        </span>
        <span>
          Mã tài khoản:{" "}
          <span className="font-medium  w-20 ">
            {truncateString(currentData?.id, 8)}
          </span>
        </span>
      </div>
    </div>
  );
};

export default CurrentUser;
