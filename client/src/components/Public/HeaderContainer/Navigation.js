import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiGetCategories } from "../../../services/categoryService";
import { formatVietnameseText } from "../../../utils/helper-function/convert";

// const nav = [
//   { name: "Trang Chủ", path: "/" },
//   { name: "Cho thuê phòng trọ", path: "/cho-thue-phong-tro" },
//   { name: "Nhà cho thuê", path: "/nha-cho-thue" },
//   { name: "Cho thuê căn hộ", path: "/cho-thue-can-ho" },
// ];

const notActive =
  "hover:bg-primaryRed px-4 bg-primaryBlue inline-block h-full flex items-center justify-center";
const active =
  "hover:bg-primaryRed px-4 bg-primaryRed inline-block h-full flex items-center justify-center";

const Navigation = () => {
  const [categories, setcategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiGetCategories();
        setcategories(response.data);
        return response;
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="w-full h-[40px] bg-primaryBlue text-white flex justify-center items-center">
      <div className="w-4/5 flex justify-start items-center text-sm font-medium h-full">
        {/* {nav?.length > 0 &&
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
          })} */}

        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Trang Chủ
        </NavLink>
        {categories?.length > 0 &&
          categories.map((item, i) => {
            return (
              <div
                key={item.code}
                className="flex justify-center items-center h-full"
              >
                <NavLink
                  to={formatVietnameseText(item.value)}
                  className={({ isActive }) => (isActive ? active : notActive)}
                >
                  {item.value}
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Navigation;
