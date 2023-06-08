import React from "react";
import { categoryName, location } from "../../utils/constant/constant";
import ProvinceBtn from "./ProvinceBtn";

const Home = () => {
  console.log(location);
  return (
    <div className="my-3 w-full border border-red-500 flex flex-col gap-3">
      <div>
        <h1 className="text-[28px] font-bold">{categoryName.HOME_TITLE}</h1>
        <p className="text-sm text-gray-700">{categoryName.HOME_DESCRIPTION}</p>
      </div>
      <div className="flex justify-center items-center gap-5 shadow-md">
        {location.map((item) => (
          <React.Fragment key={item.id}>
            <ProvinceBtn image={item.image} name={item.name} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Home;
