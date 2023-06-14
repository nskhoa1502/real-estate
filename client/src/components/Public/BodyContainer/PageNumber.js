import React, { useCallback, memo } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const notActive = `w-[46px] h-[48px] flex justify-center items-center py-3 px-2 bg-white hover:bg-gray-200 hover:text-black rounded-md cursor-pointer`;
const active = `w-[46px] h-[48px] flex justify-center items-center py-3 px-2 bg-[#e13427]  text-white rounded-md cursor-pointer`;

const PageNumber = ({ number, currentPage, type, endpage, category }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [params] = useSearchParams();

  const areaCode = params.getAll("areaCode");
  const priceCode = params.getAll("priceCode");
  const provinceCode = params.get("provinceCode");
  const categoryCode = params.get("categoryCode");

  const navigateToPage = useCallback(
    (page, additionalParams = {}) => {
      const params = {
        page,
        ...((areaCode && areaCode.length > 0 && { areaCode: areaCode }) || {}),
        ...((priceCode && priceCode.length > 0 && { priceCode: priceCode }) ||
          {}),
        ...((provinceCode && { provinceCode: provinceCode }) || {}),
        ...((categoryCode && { categoryCode: categoryCode }) || {}),
        ...additionalParams,
      };

      navigate({
        pathname: location.pathname,
        search: createSearchParams(params).toString(),
      });
    },
    [
      navigate,
      areaCode,
      priceCode,
      provinceCode,
      categoryCode,
      location.pathname,
    ]
  );

  const handleClick = () => {
    if (type === "end") {
      navigateToPage(endpage);
      return;
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
