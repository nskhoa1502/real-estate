import React from "react";
import { location } from "../../../utils/constant/constant";
import ProvinceBtn from "./ProvinceBtn";

const Province = ({ id, title, description }) => {
  return (
    <div className="w-1100  ">
      <div className="mb-5 font">
        <h1 className="text-[28px] font-bold">{title}</h1>
        <p className="text-md text-gray-700">{description}</p>
      </div>

      <div className="flex justify-center items-center gap-5 ">
        {location.map((item) => (
          <React.Fragment key={item.id}>
            <ProvinceBtn image={item.image} name={item.name} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Province;
