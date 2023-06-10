import React, { useEffect } from "react";
import { Button } from "../../../UI";
import { Item } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLimit } from "../../../slices/postSlice";

const List = ({ pageNumber }) => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  // const listRef = useRef();

  useEffect(() => {
    dispatch(getPostsLimit(+pageNumber));
  }, [pageNumber, dispatch]);

  // useEffect(() => {
  //   listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  // }, [posts]);

  return (
    <div
      // ref={listRef}
      className="w-full p-2 bg-white shadow-md rounded-md px-6"
    >
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
