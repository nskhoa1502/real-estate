import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../utils/path/path";
import { Header, Sidebar } from "../components/System";

const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className="m-auto min-h-screen h-full flex flex-col items-center h-screen">
      <Header />
      <div className="flex w-full gap-6 min-h-screen ">
        <Sidebar />

        <div className="flex-auto bg-white shadow-md p-4 overflow-y-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
