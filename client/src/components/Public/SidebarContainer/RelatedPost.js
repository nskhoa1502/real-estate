import React, { useEffect } from "react";
import RelatedItem from "./RelatedItem";
import { useDispatch, useSelector } from "react-redux";
import { getNewPosts, getPopularPost } from "../../../redux/slices/postSlice";

const RelatedPost = ({ newPost }) => {
  const dispatch = useDispatch();
  const { newPosts, popularPosts } = useSelector((state) => state.post);
  // console.log(popularPosts[0]?.star);

  useEffect(() => {
    if (newPost) {
      dispatch(getNewPosts());
    } else {
      dispatch(getPopularPost({ order: ["star", "DESC"] }));
    }
  }, [dispatch]);

  return (
    <div className="w-full bg-white rounded-md shadow-md p-4">
      <h3 className="font-semibold p text-lg">
        {newPost ? "Tin mới đăng" : "Tin nổi bật"}
      </h3>
      <div className="w-full flex flex-col gap-5">
        {newPost &&
          newPosts?.length > 0 &&
          newPosts?.map((item) => {
            return (
              <RelatedItem
                key={item?.id}
                title={item.title}
                price={item?.attributes?.price}
                createdAt={item?.createdAt}
                image={JSON.parse(item?.images.image)}
                postId={item?.id}
              />
            );
          })}
        {!newPost &&
          popularPosts?.length > 0 &&
          popularPosts?.map((item) => {
            return (
              <RelatedItem
                key={item?.id}
                title={item.title}
                price={item?.attributes?.price}
                createdAt={item?.createdAt}
                image={JSON.parse(item?.images.image)}
                stars={item?.star}
                postId={item?.id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default RelatedPost;
