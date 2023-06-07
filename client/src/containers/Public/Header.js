import React from "react";
import logo from "../../assets/logoWithoutBackground.png";
import { Button } from "../../UI";
import icons from "../../utils/icons";

const { AiOutlinePlusCircle, BiUserPlus, BiExit, AiOutlineHeart } = icons;

const Header = () => {
  return (
    <div className="w-1100 flex items-center justify-between bg-red-200">
      <img
        src={logo}
        alt="logo"
        className="w-[240px] h-[70px] object-contain"
      />
      <div className="flex items-center text-base">
        <Button
          text={"Yêu thích"}
          textColor="text-black"
          Icons={AiOutlineHeart}
          order="before"
        />
        <Button
          text={"Đăng nhập"}
          textColor="text-black"
          Icons={BiUserPlus}
          order="before"
        />
        <Button
          text={"Đăng Ký"}
          textColor="text-black"
          Icons={BiExit}
          order="before"
        />
        <Button
          text={"Đăng tin mới"}
          textColor="text-white"
          bgColor={`bg-primaryRed`}
          Icons={AiOutlinePlusCircle}
          order="after"
        />
      </div>
    </div>
  );
};

export default Header;
