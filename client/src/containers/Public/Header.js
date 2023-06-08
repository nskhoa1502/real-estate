import React, { useCallback } from "react";
import logo from "../../assets/logoWithoutBackground.png";
import { Button } from "../../UI";
import icons from "../../utils/icons";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../utils/path";

const { AiOutlinePlusCircle, BiUserPlus, BiExit, AiOutlineHeart } = icons;

const Header = () => {
  const navigate = useNavigate();
  const loginNavigation = useCallback(() => {
    navigate(path.LOGIN, { state: { register: false } });
  }, [navigate]);
  const registerNavigation = useCallback(() => {
    navigate(path.SIGNUP, { state: { register: true } });
  }, [navigate]);

  return (
    <div className="w-1100 flex items-center justify-between bg-red-200">
      <Link to={"/"}>
        <img
          src={logo}
          alt="logo"
          className="w-[240px] h-[70px] object-contain"
        />
      </Link>
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
          onClick={loginNavigation}
        />
        <Button
          text={"Đăng Ký"}
          textColor="text-black"
          Icons={BiExit}
          order="before"
          onClick={registerNavigation}
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
