import React from "react";
import { location } from "../../../utils/constant/constant";
import ProvinceBtn from "./ProvinceBtn";

const Province = ({ title, description }) => {
  // console.log(title);
  return (
    <div className="w-full ">
      <div className="mb-5 font">
        <h1 className="text-[28px] font-bold">{title}</h1>
        <p className="text-md text-gray-700">{description}</p>
      </div>

      <div className="flex justify-center items-center gap-5 ">
        {location.map((item) => (
          <React.Fragment key={item.id}>
            <ProvinceBtn
              image={item.image}
              name={item.name}
              provinceCode={item.provinceCode}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Province;
