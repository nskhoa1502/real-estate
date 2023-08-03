import React, { useEffect, useState } from "react";
import { Item } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLimit } from "../../../redux/slices/postSlice";
import { getPostsFilter } from "../../../redux/slices/postSlice";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const List = ({ category }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [sort, setSort] = useState(0);

  const pageNumber = params.get("page") || 1;
  // const [pageNumber, setPageNumber] = useState(params.get("page") || 1);
  const areaCode = params.get("areaCode") || null;
  const priceCode = params.get("priceCode") || null;
  const categoryCode = params.get("categoryCode") || category || null;
  const provinceCode = params.get("provinceCode") || null;
  const areaNumber = params.getAll("areaNumber") || null;
  const priceNumber = params.getAll("priceNumber") || null;
  const labelCode = params.get("labelCode") || null;

  let filterOptions = {
    page: +pageNumber,
    areaCode,
    priceCode,
    areaNumber,
    priceNumber,
    labelCode,
  };

  filterOptions = Object.fromEntries(
    Object.entries(filterOptions).filter(([_, value]) => {
      return (
        value !== "null" &&
        value !== 0 &&
        value !== null &&
        !(Array.isArray(value) && value.length === 0)
      );
    })
  );

  // console.log(filterOptions);
  useEffect(() => {
    if (categoryCode !== "null") {
      filterOptions.categoryCode = categoryCode;
    }
    if (provinceCode !== "null") {
      filterOptions.provinceCode = provinceCode;
    }
    if (sort === 0) {
      filterOptions.order = ["star", "DESC"];
    }
    if (sort === 1) {
      filterOptions.order = ["createdAt", "DESC"];
    }
    if (
      categoryCode ||
      areaNumber.length > 0 ||
      priceNumber.length > 0 ||
      areaCode ||
      priceCode ||
      provinceCode ||
      labelCode
    ) {
      // console.log(filterOptions);
      dispatch(getPostsFilter(filterOptions));
    } else {
      if (sort === 0) {
        dispatch(getPostsLimit({ page: pageNumber, order: ["star", "DESC"] }));
      }
      if (sort === 1) {
        dispatch(
          getPostsLimit({ page: pageNumber, order: ["createdAt", "DESC"] })
        );
      }
    }
  }, [
    JSON.stringify(areaNumber),
    JSON.stringify(priceNumber),
    pageNumber,
    categoryCode,
    dispatch,
    provinceCode,
    areaCode,
    priceCode,
    sort,
    labelCode,
  ]);

  return (
    <div className="w-full p-2 bg-white shadow-md rounded-md px-6">
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-semibold my-3">Danh sách tin đăng</h4>
        <span>Cập nhật: 12:05 25/08/2022</span>
      </div>
      <div className="flex items-center gap-1 my-3">
        <span>Sắp xếp:</span>

        <span
          onClick={() => {
            setSort(0);
            params.set("page", "1");
            navigate({
              pathname: location?.pathname,
              search: createSearchParams({
                ...filterOptions,
                page: 1,
              }).toString(),
            });
          }}
          className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${
            sort === 0 && "text-red-500"
          }`}
        >
          Phổ biến
        </span>
        <span
          onClick={() => {
            setSort(1);
            params.set("page", "1");
            navigate({
              pathname: location?.pathname,
              search: createSearchParams({
                ...filterOptions,
                page: 1,
              }).toString(),
            });
          }}
          className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${
            sort === 1 && "text-red-500"
          }`}
        >
          Mới nhất
        </span>
      </div>
      <div className="items">
        {posts?.length > 0 &&
          posts.map((item) => {
            return (
              <Item
                key={item?.id}
                id={item?.id}
                address={item?.address}
                attributes={item?.attributes}
                description={JSON.parse(item?.description)}
                star={+item?.star}
                title={item?.title}
                user={item?.user}
                images={JSON.parse(item?.images?.image)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default List;
