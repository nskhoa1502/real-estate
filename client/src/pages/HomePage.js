import React from "react";
import Header from "../components/Public/HeaderContainer/Header";
import { Outlet } from "react-router-dom";
import Navigation from "../components/Public/HeaderContainer/Navigation";
import { Contact, Info, Search } from "../components/Public";
import { useSelector } from "react-redux";

// import { Search } from "../components/Public";
const HomePage = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className=" m-auto min-w-[1100px] border  flex flex-col items-center relative ">
      <Header />
      <Navigation />

      {isLoggedIn && <Search />}
      <div className="w-[1100px]  min-w-[1100px] flex flex-col items-start justify-start ">
        <Outlet />
      </div>
      <div className=" w-[1100px] flex flex-col gap-5">
        <Info />
        <Contact />
      </div>
    </div>
  );
};

export default HomePage;
