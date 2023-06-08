import React from "react";
import { NavLink } from "react-router-dom";

const nav = [
  { name: "Trang Chủ", path: "/" },
  { name: "Cho thuê phòng trọ", path: "/cho-thue-phong-tro" },
  { name: "Nhà cho thuê", path: "/nha-cho-thue" },
  { name: "Cho thuê căn hộ", path: "/cho-thue-can-ho" },
];

const notActive =
  "hover:bg-primaryRed px-4 bg-primaryBlue inline-block h-full flex items-center justify-center";
const active =
  "hover:bg-primaryRed px-4 bg-primaryRed inline-block h-full flex items-center justify-center";

const Navigation = () => {
  return (
    <div className="w-full h-[40px] bg-primaryBlue text-white flex justify-center items-center">
      <div className="w-1100 flex justify-start items-center text-sm font-medium h-full">
        {nav?.length > 0 &&
          nav.map((item, i) => {
            return (
              <div key={i} className="flex justify-center items-center h-full">
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? active : notActive)}
                >
                  {item.name}
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Navigation;
