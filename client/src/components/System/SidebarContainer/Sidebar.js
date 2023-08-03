import React, { useEffect, useState } from "react";
import anon_avatar from "../../../assets/anon_avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { extractNumbersFromId } from "../../../utils/helper-function/extractNumberId";
import userSidebar from "../../../utils/constant/userSidebar";
import { NavLink } from "react-router-dom";
import icons from "../../../utils/icon/icons";
import { logout } from "../../../redux/slices/authSlice";
import { blobToBase64 } from "../../../utils/helper-function/base64";

const activeStyle =
  "hover:bg-gray-300  py-2 flex gap-2 items-center font-bold ";
const notActiveStyle =
  "hover:bg-gray-300  py-2 flex gap-2 items-center rounded-md";

const { RiLogoutBoxRLine } = icons;

const Sidebar = () => {
  const { currentData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [avatarBase64, setAvatarBase64] = useState("");

  useEffect(() => {
    if (currentData?.avatar) {
      const convertAvatarToBase64 = async () => {
        const base64 = await blobToBase64(currentData?.avatar);
        setAvatarBase64(base64);
      };
      convertAvatarToBase64();
    }
  }, [currentData?.avatar]);

  const handleLogout = async () => {
    dispatch(logout());
  };

  return (
    <div className="w-[256px] p-4 flex flex-col gap-6  ">
      <div className="flex  flex-col gap-4">
        <div className="flex items-center gap-3">
          <img
            src={avatarBase64 || anon_avatar}
            alt="avatar"
            className="w-12 h-12 object-cover rounded-full border-2 border-white items-center"
          />
          <div className="flex flex-col justify-center">
            <span className="font-semibold">{currentData?.name}</span>
            <small>{currentData?.phone}</small>
          </div>
        </div>
        <span>
          Mã thành viên: <span>{extractNumbersFromId(currentData?.id)}</span>
        </span>
      </div>
      <div>
        {" "}
        {userSidebar?.map((item) => {
          return (
            <NavLink
              className={({ isActive }) =>
                isActive ? activeStyle : notActiveStyle
              }
              key={item?.id}
              to={item?.path}
            >
              {item?.icon}
              {item?.text}
            </NavLink>
          );
        })}
        <div className="flex items-center justify-start gap-2 hover:bg-gray-300">
          <RiLogoutBoxRLine />
          <span className="cursor-pointer  py-2" onClick={handleLogout}>
            Thoát
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
