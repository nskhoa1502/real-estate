import React, { memo } from "react";
import { location } from "../../../utils/constant/constant";

const ProvinceBtn = ({ name, image }) => {
  return (
    <div className=" shadow-md rounded-bl-md rounded-br-md text-blue-600 hover:text-orange-500 cursor-pointer">
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
