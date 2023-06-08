import React from "react";
import Search from "./Search";
import { categoryName } from "../../utils/constant";
const Home = () => {
  return (
    <div className="my-3 w-full border border-red-500 flex flex-col gap-3">
      <Search />
      <div>
        <h1 className="text-[28px] font-bold">{categoryName.HOME_TITLE}</h1>
        <p className="text-sm text-gray-700">{categoryName.HOME_DESCRIPTION}</p>
      </div>
    </div>
  );
};

export default Home;
