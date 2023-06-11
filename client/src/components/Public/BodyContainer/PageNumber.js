import React, { useCallback, memo } from "react";
import { useDispatch } from "react-redux";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { queryFilter } from "../../../redux/slices/filterSlice";

const notActive = `w-[46px] h-[48px] flex justify-center items-center py-3 px-2 bg-white hover:bg-gray-200 hover:text-black rounded-md cursor-pointer`;
const active = `w-[46px] h-[48px] flex justify-center items-center py-3 px-2 bg-[#e13427]  text-white rounded-md cursor-pointer`;

const PageNumber = ({ number, currentPage, type, endpage, category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [params] = useSearchParams();

  const areaCode = params.get("areaCode") || null;
  const priceCode = params.get("priceCode") || null;

  const navigateToPage = useCallback(
    (page, additionalParams = {}) => {
      const params = {
        page,
        ...((areaCode && { areaCode: areaCode }) || {}),
        ...((priceCode && { priceCode: priceCode }) || {}),
        ...((category?.code && { categoryCode: category?.code }) || {}),
        ...additionalParams,
      };

      navigate({
        pathname: location.pathname,
        search: createSearchParams(params).toString(),
      });
    },
    [navigate, areaCode, priceCode, category, location.pathname]
  );

  const handleClick = () => {
    if (type === "end") {
      navigateToPage(endpage);
      return;
    }

    if (areaCode || priceCode) {
      dispatch(
        queryFilter({
          areaCode,
          priceCode,
          page: number,
          categoryCode: category?.code,
        })
      );
    }

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
