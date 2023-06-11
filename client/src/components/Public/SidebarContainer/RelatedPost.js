import React from "react";
import RelatedItem from "./RelatedItem";

const RelatedPost = () => {
  return (
    <div className="w-full bg-white rounded-md shadow-md p-4">
      <h3 className="font-semibold p text-lg">Tin mới đăng</h3>
      <div className="w-full flex flex-col gap-5">
        <RelatedItem />
        <RelatedItem />
        <RelatedItem />
      </div>
    </div>
  );
};

export default RelatedPost;
