import React, { useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { queryFilter } from "../../../redux/slices/filterSlice";

const notActive = `w-[46px] h-[48px] flex justify-center items-center py-3 px-2 bg-white hover:bg-gray-200 hover:text-black rounded-md cursor-pointer`;
const active = `w-[46px] h-[48px] flex justify-center items-center py-3 px-2 bg-[#e13427]  text-white rounded-md cursor-pointer`;

const PageNumber = ({ number, currentPage, type, endpage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { areaCode, priceCode } = useSelector((state) => state.filter);

  const navigateToPage = useCallback(
    (page, additionalParams = {}) => {
      const params = {
        page,
        ...((areaCode && { area_code: areaCode }) || {}),
        ...((priceCode && { price_code: priceCode }) || {}),
        ...additionalParams,
      };

      navigate({
        pathname: "/",
        search: createSearchParams(params).toString(),
      });
    },
    [navigate, areaCode, priceCode]
  );

  const handleClick = () => {
    if (type === "end") {
      navigateToPage(endpage);
      return;
    }

    if (areaCode || priceCode) {
      dispatch(queryFilter({ areaCode, priceCode, page: number }));
    }

    // Check if the current page is different from the clicked page.
    // This prevents unnecessary navigation when clicking the current page number.
    if (typeof number === "number") {
      navigateToPage(number);
    }
  };

  return (
    <div
      className={+number === +currentPage ? active : notActive}
      onClick={handleClick}
    >
      {number}
    </div>
  );
};

export default memo(PageNumber);
