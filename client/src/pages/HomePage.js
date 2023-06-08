import React from "react";
import Header from "../components/Public/Header";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Public/Navigation";
// import { Search } from "../components/Public";
const HomePage = () => {
  return (
    <div className="w-full m-auto h-full border  flex flex-col items-center">
      <Header />
      <Navigation />
      {/* <Search /> */}
      <div className="w-1100 flex flex-col items-start justify-start">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
