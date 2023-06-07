import React from "react";
import logo from "../../assets/logoWithoutBackground.png";

const Header = () => {
  return (
    <div className="w-1100 flex items-center justify-between bg-primaryRed">
      <img
        src={logo}
        alt="logo"
        className="w-[240px] h-[70px] object-contain"
      />
    </div>
  );
};

export default Header;
