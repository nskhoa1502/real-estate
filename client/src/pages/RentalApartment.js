import React, { useEffect, useState } from "react";
import { categoryFeatured } from "../utils/constant/constant";
import {
  ItemSidebar,
  List,
  Pagination,
  Province,
  RelatedPost,
} from "../components/Public";

import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { formatVietnameseText } from "../utils/helper-function/convert";

const { id, HOME_TITLE, HOME_DESCRIPTION } = categoryFeatured[3];

const RentalApartment = () => {
  const { prices, areas, categories } = useSelector((state) => state.app);
  const { totalPage, postPerPage, count } = useSelector((state) => state.post);
  const [params] = useSearchParams();
  const pageNumber = params.get("page") || 1;
  const [category, setCategory] = useState({});

  const location = useLocation();

  useEffect(() => {
    const categoryObj = categories?.find(
      (category) =>
        `/${formatVietnameseText(category.value)}` === location.pathname
    );

    setCategory(categoryObj);
  }, [location, categories]);

  return (
    // ===================== FEATURED PROVINCES ====================
    <div className="my-3 w-full flex flex-col gap-5 items-center">
      <Province id={id} title={HOME_TITLE} description={HOME_DESCRIPTION} />

      {/* ============= BODY ================ */}
      <div className="w-full flex gap-3">
        {/* =========== LEFT BODY ============= */}
        <div className="w-[70%]">
          <List categoryCode={category.code} />
          <Pagination
            key={pageNumber}
            number={pageNumber}
            prices={prices}
            areas={areas}
            totalPage={totalPage}
            postPerPage={postPerPage}
            count={count}
            category={category}
          />
        </div>

        {/*  =========== SIDEBAR ============== */}
        <div className="w-[30%] flex flex-col gap-4 justify-start items-center">
          <ItemSidebar
            isDouble={true}
            content={prices}
            title={`Xem theo giá`}
            type="priceCode"
            category={category}
          />
          <ItemSidebar
            isDouble={true}
            content={areas}
            title={`Xem theo diện tích`}
            type="areaCode"
            category={category}
          />
          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default RentalApartment;
