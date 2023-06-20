import React, { memo } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { path } from "../../../utils/path/path";

const ProvinceBtn = ({ name, image, provinceCode }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    const titleSearch = `Cho thuê ${name}, Phòng trọ giá rẻ`;
    // console.log(provinceCode);
    // console.log(titleSearch);
    navigate(
      {
        pathname: path.TIM_KIEM,
        search: createSearchParams({ provinceCode }).toString(),
      },
      { state: { titleSearch } }
    );
  };

  return (
    <div
      className=" shadow-md rounded-bl-md rounded-br-md text-blue-600 hover:text-orange-500 cursor-pointer"
      onClick={() => handleNavigation()}
    >
      <img
        src={image}
        alt={name}
        className="w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md "
      />
      <div className="font-medium  p-2 text-center ">{name}</div>
    </div>
  );
};

export default memo(ProvinceBtn);
