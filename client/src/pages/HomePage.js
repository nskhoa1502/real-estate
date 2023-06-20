import React from "react";
import Header from "../components/Public/HeaderContainer/Header";
import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../components/Public/HeaderContainer/Navigation";
import { Contact, Info, Search } from "../components/Public";
import { useSelector } from "react-redux";
import { path } from "../utils/path/path";

// import { Search } from "../components/Public";
const HomePage = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();

  return (
    <div className=" m-auto min-w-[1100px] border  flex flex-col items-center relative ">
      <Header />
      <div className="w-full sticky top-0 z-50">
        <Navigation />
      </div>

      {isLoggedIn &&
        location.pathname !== `/${path.LIEN_HE}` &&
        !location.pathname?.includes(`${path.CHI_TIET}`) && <Search />}
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
