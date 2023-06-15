import React, { useEffect } from "react";
import { Button } from "../../../UI";
import { Item } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLimit } from "../../../redux/slices/postSlice";
import { getPostsFilter } from "../../../redux/slices/postSlice";
import { useSearchParams } from "react-router-dom";

const List = ({ category }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const [params] = useSearchParams();

  const pageNumber = params.get("page") || 1;
  const areaCode = params.get("areaCode") || null;
  const priceCode = params.get("priceCode") || null;
  const categoryCode = params.get("categoryCode") || category || null;
  const provinceCode = params.get("provinceCode") || null;
  const areaNumber = params.getAll("areaNumber") || null;
  const priceNumber = params.getAll("priceNumber") || null;

  // console.log(`page `, pageNumber);
  // console.log(`area code `, areaCode);
  // console.log(`price code `, priceCode);
  // console.log(`category code `, categoryCode);
  // console.log(`province code `, provinceCode);
  // console.log(`areaNumber `, areaNumber);
  // console.log(`priceNumber `, priceNumber);

  useEffect(() => {
    let filterOptions = {
      page: +pageNumber,
      areaCode,
      priceCode,
      areaNumber,
      priceNumber,
    };
    if (categoryCode !== "null") {
      filterOptions.categoryCode = categoryCode;
    }
    if (provinceCode !== "null") {
      filterOptions.provinceCode = provinceCode;
    }
    if (
      categoryCode ||
      areaNumber.length > 0 ||
      priceNumber.length > 0 ||
      areaCode ||
      priceCode ||
      provinceCode
    ) {
      // console.log(filterOptions);
      dispatch(getPostsFilter(filterOptions));
    } else {
      dispatch(getPostsLimit(pageNumber));
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
  ]);

  return (
    <div className="w-full p-2 bg-white shadow-md rounded-md px-6">
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-semibold my-3">Danh sách tin đăng</h4>
        <span>Cập nhật: 12:05 25/08/2022</span>
      </div>
      <div className="flex items-center gap-1 my-3">
        <span>Sắp xếp:</span>
        <Button bgColor={`bg-gray-200`} text={"Mặc định"} />
        <Button bgColor={`bg-gray-200`} text={"Mới nhất"} />
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
