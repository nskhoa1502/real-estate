import React, { memo } from "react";
import anon_avatar from "../../../assets/anon_avatar.png";
import icons from "../../../utils/icon/icons";
import { Link } from "react-router-dom";

const { BsDot, BsFillTelephoneFill, SiZalo } = icons;

const BoxInfo = ({ userData }) => {
  return (
    <>
      <div className="w-full bg-yellow-500 rounded-md shadow-md flex flex-col items-center p-4 gap-4 ">
        <img
          src={anon_avatar}
          alt="avatar"
          className="w-16 h-16 object-contain rounded-full"
        />
        <h3 className="font-medium text-xl">{userData?.name}</h3>
        <span className="flex items-center">
          <BsDot color="green" size={30} />
          <span>Đang hoạt động</span>
        </span>
        <Link
          to="#"
          className="bg-[#138878] py-2 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold text-lg cursor-pointer hover:underline"
          href="/"
        >
          <BsFillTelephoneFill /> {userData?.phone}
        </Link>
        <Link
          to="#"
          className="bg-white py-1 flex items-center justify-center gap-2 w-full rounded-md text-white font-bold text-lg cursor-pointer hover:underline"
          href="/"
        >
          <SiZalo color="blue" size={35} />
        </Link>
      </div>
    </>
  );
};

export default memo(BoxInfo);
