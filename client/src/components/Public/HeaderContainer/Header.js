import React, { useCallback, useEffect, useRef, useState } from "react";
import logo from "../../../assets/logoWithoutBackground.png";
import { Button } from "../../../UI";
import icons from "../../../utils/icon/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { path } from "../../../utils/path/path";
import { useDispatch, useSelector } from "react-redux";
import { logout, resetPopup } from "../../../redux/slices/authSlice";
import userSettings from "../../../utils/constant/userSettings";
import CurrentUser from "./CurrentUser";

const {
  AiOutlinePlusCircle,
  BiUserPlus,
  BiExit,
  AiOutlineHeart,
  RiLogoutBoxRLine,
  RxDashboard,
} = icons;

const Header = () => {
  const navigate = useNavigate();
  const loginNavigation = useCallback(() => {
    navigate(path.LOGIN, { state: { register: false } });
  }, [navigate]);
  const registerNavigation = useCallback(() => {
    navigate(path.SIGNUP, { state: { register: true } });
  }, [navigate]);
  const headerRef = useRef();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [searchParam] = useSearchParams();
  const [isShowSetting, setIsShowSetting] = useState(false);

  const currentPage = searchParam.get("page");

  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage]);

  const handleLogout = async () => {
    dispatch(logout());

    dispatch(resetPopup());
    setIsShowSetting(false);
  };

  return (
    <div
      ref={headerRef}
      className="w-[1100px] flex items-center  bg-primaryWhite justify-between  "
    >
      <Link to={"/"}>
        <img
          src={logo}
          alt="logo"
          className="w-[240px] h-[70px] object-contain"
        />
      </Link>
      <div className="flex items-center text-base gap-2">
        {!isLoggedIn && (
          <div className="flex items-center gap-1">
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
          </div>
        )}
        {isLoggedIn && (
          <>
            <div className="flex items-center gap-1 relative">
              <CurrentUser />
              <Button
                text={"Yêu thích"}
                textColor="text-black"
                Icons={AiOutlineHeart}
                order="before"
              />
              {/* <Button
              text={"Đăng xuất"}
              textColor="text-black"
              Icons={BiUserPlus}
              order="before"
              onClick={handleLogout}
            /> */}
              <Button
                text={"Quản lý tài khoản"}
                textColor="text-black"
                Icons={RxDashboard}
                order="before"
                px="px-6"
                onClick={() => setIsShowSetting((prev) => !prev)}
              />
              {isShowSetting && (
                <div className="absolute top-full min-w-200 bg-white shadow-md rounded-md p-4 right-0 flex flex-col  text-blue-600 z-50">
                  {userSettings?.map((item) => {
                    return (
                      <Link
                        className="hover:text-orange-500 border-b border-gray-200 py-2 flex gap-2 items-center"
                        key={item?.id}
                        to={item?.path}
                      >
                        {item?.icon}
                        {item?.text}
                      </Link>
                    );
                  })}
                  <div className="flex items-center justify-start gap-2">
                    <RiLogoutBoxRLine />
                    <span
                      className="cursor-pointer hover:text-orange-500 py-2"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <Link to="/quan-ly/dang-tin-moi">
          <Button
            text={"Đăng tin mới"}
            textColor="text-white"
            bgColor={`bg-primaryRed`}
            Icons={AiOutlinePlusCircle}
            order="after"
          />
        </Link>
      </div>
    </div>
  );
};

export default Header;
