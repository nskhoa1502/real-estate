import React from "react";
import Header from "../components/Public/Header";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Public/Navigation";
const HomePage = () => {
  return (
    <div className="w-full m-auto h-full border  flex flex-col items-center">
      <Header />
      <Navigation />
      <div className="w-3/5 flex flex-col items-start justify-start">
        <Outlet />
      </div>
    </div>
  );
};

export default HomePage;
