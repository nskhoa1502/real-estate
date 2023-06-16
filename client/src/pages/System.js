import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { path } from "../utils/path/path";
import { Header, Sidebar } from "../components/System";

const System = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />;
  return (
    <div className="m-auto h-screen   flex flex-col items-center ">
      <Header />
      <div className="flex  w-full  gap-6  h-full min-h-screen">
        <Sidebar />
        <div className="flex-auto bg-white shadow-md p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default System;
