import React, { memo } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const notActive = `w-[46px] h-[48px] flex justify-center items-center py-3 px-2 bg-white hover:bg-gray-200 hover:text-black rounded-md cursor-pointer`;

const active = `w-[46px] h-[48px] flex justify-center items-center py-3 px-2 bg-[#e13427]  text-white rounded-md cursor-pointer`;

const PageNumber = ({ number, currentPage, type, endpage }) => {
  const navigate = useNavigate();

  const handleChangePage = () => {
    if (typeof number === "number") {
      navigate({
        pathname: "/",
        search: createSearchParams({
          page: number,
        }).toString(),
      });
    }
    if (type === "end") {
      navigate({
        pathname: "/",
        search: createSearchParams({
          page: endpage,
        }).toString(),
      });
    }
  };

  if (typeof number === "number") {
    return (
      <div
        className={+number === +currentPage ? active : notActive}
        onClick={handleChangePage}
      >
        {number}
      </div>
    );
  } else {
    return (
      <div className={notActive} onClick={handleChangePage}>
        {number}
      </div>
    );
  }
};

export default memo(PageNumber);
