import React, { memo } from "react";
import { location } from "../../utils/constant/constant";

const ProvinceBtn = ({ name, image }) => {
  return (
    <div className=" shadow-md rounded-bl-md rounded-br-md">
      <img
        src={image}
        alt={name}
        className="w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md"
      />
      <div className="font-medium text-blue-600 p-2 hover:text-orange-500 text-center">
        {name}
      </div>
    </div>
  );
};

export default memo(ProvinceBtn);
