import React from "react";
import { ItemSidebar, List, Pagination, RelatedPost } from "../../../Public";

import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

const SearchDetail = () => {
  const { prices, areas, searchTitle } = useSelector((state) => state.app);
  const { totalPage, postPerPage, count } = useSelector((state) => state.post);
  const [params] = useSearchParams();
  const pageNumber = params.get("page") || 1;
  // const { state } = useLocation();

  //   console.log(state);

  return (
    // ===================== FEATURED PROVINCES ====================
    <div className="my-3 w-full flex flex-col gap-5 items-center">
      <div className="mt-10 mb-5">
        <h1 className="text-[1.5rem] font-bold">
          {searchTitle || "Kết quả tìm kiếm"}
        </h1>
        <p>
          {searchTitle} phòng mới xây, chính chủ gần chợ, trường học, siêu thị,
          cửa hàng tiện lợi, khu an ninh.
        </p>
      </div>
      {/* ============= BODY ================ */}
      <div className="w-full flex gap-3">
        {/* =========== LEFT BODY ============= */}
        <div className="w-[70%]">
          <List />
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

export default SearchDetail;
