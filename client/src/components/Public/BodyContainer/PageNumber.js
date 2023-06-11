import React, { useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { queryFilter } from "../../../redux/slices/filterSlice";
import { formatVietnameseText } from "../../../utils/helper-function/convert";

const notActive = `w-[46px] h-[48px] flex justify-center items-center py-3 px-2 bg-white hover:bg-gray-200 hover:text-black rounded-md cursor-pointer`;
const active = `w-[46px] h-[48px] flex justify-center items-center py-3 px-2 bg-[#e13427]  text-white rounded-md cursor-pointer`;

const PageNumber = ({ number, currentPage, type, endpage, category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [params] = useSearchParams();

  // const pageNumber = params.get("page") || 1;
  const areaCode = params.get("areaCode") || null;
  const priceCode = params.get("priceCode") || null;

  // console.log(category);

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
        pathname: `/${
          category?.value ? formatVietnameseText(category?.value) : ""
        }`,
        search: createSearchParams(params).toString(),
      });
    },
    [navigate, areaCode, priceCode, category]
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
