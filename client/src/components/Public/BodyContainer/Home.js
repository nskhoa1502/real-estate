import React, { useEffect } from "react";
import { categoryFeatured } from "../../../utils/constant/constant";
import { useSearchParams } from "react-router-dom";
import { ItemSidebar, Province, List, Pagination, RelatedPost } from "../index";
import { useDispatch, useSelector } from "react-redux";
import {
  getAreas,
  getPrices,
  getProvinces,
} from "../../../redux/slices/appSlice";
import { getCategories } from "../../../redux/slices/appSlice";

const Home = () => {
  const { id, HOME_TITLE, HOME_DESCRIPTION } = categoryFeatured;
  const [params] = useSearchParams();
  const pageNumber = params.get("page") || 1;

  const { categories } = useSelector((state) => state.app);
  const { prices, areas } = useSelector((state) => state.app);
  const { totalPage, postPerPage, count } = useSelector((state) => state.post);

  const dispatch = useDispatch();

  // console.log(areas);
  useEffect(() => {
    dispatch(getPrices());
    dispatch(getAreas());
    dispatch(getCategories());
    dispatch(getProvinces());
  }, [dispatch]);

  return (
    // ===================== FEATURED PROVINCES ====================
    <div className="my-3 w-full flex flex-col gap-5 items-center">
      <Province id={id} title={HOME_TITLE} description={HOME_DESCRIPTION} />

      {/* ============= BODY ================ */}
      <div className="w-full flex gap-3">
        {/* =========== LEFT BODY ============= */}
        <div className="w-[70%]">
          <List pageNumber={pageNumber} />
          <Pagination
            key={pageNumber}
            number={pageNumber}
            prices={prices}
            areas={areas}
            totalPage={totalPage}
            postPerPage={postPerPage}
            count={count}
          />
        </div>

        {/*  =========== SIDEBAR ============== */}
        <div className="w-[30%] flex flex-col gap-4 justify-start items-center">
          <ItemSidebar content={categories} title={`Danh sách cho thuê`} />
          <ItemSidebar
            isDouble={true}
            content={prices}
            title={`Xem theo giá`}
            type="priceCode"
          />
          <ItemSidebar
            isDouble={true}
            content={areas}
            title={`Xem theo diện tích`}
            type="areaCode"
          />
          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default Home;
