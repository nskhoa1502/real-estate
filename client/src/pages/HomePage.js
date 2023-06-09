import React from "react";
import Header from "../components/Public/HeaderContainer/Header";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Public/HeaderContainer/Navigation";
import { Province, ProvinceBtn, Search } from "../components/Public";
import { location } from "../utils/constant/constant";
import { categoryFeatured } from "../utils/constant/constant";
// import { Search } from "../components/Public";
const HomePage = () => {
  return (
    <div className=" m-auto h-full border  flex flex-col items-center ">
      <Header />
      <Navigation />
      <Search />

      {/* <Search /> */}
      <div className="w-4/5 flex flex-col items-start justify-start">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
