import React, { useEffect } from "react";
import RelatedItem from "./RelatedItem";
import { useDispatch, useSelector } from "react-redux";
import { getNewPosts } from "../../../redux/slices/postSlice";

const RelatedPost = () => {
  const dispatch = useDispatch();
  const { newPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getNewPosts());
  }, []);

  return (
    <div className="w-full bg-white rounded-md shadow-md p-4">
      <h3 className="font-semibold p text-lg">Tin mới đăng</h3>
      <div className="w-full flex flex-col gap-5">
        {newPosts?.length > 0 &&
          newPosts?.map((item) => {
            return (
              <RelatedItem
                key={item?.id}
                img={``}
                title={item.title}
                price={item?.attributes?.price}
                createdAt={item?.createdAt}
                image={JSON.parse(item?.images.image)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default RelatedPost;
