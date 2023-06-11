import React from "react";
import { truncateString } from "../../../utils/helper-function/convert";
import moment from "moment";
import "moment/locale/vi";

const RelatedItem = ({ title, price, image, createdAt }) => {
  const formatTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };
  return (
    <div className="w-full flex items-start justify-start gap-3 border-b border-gray-300 border-dashed py-2">
      <img
        src={image[0]}
        alt="img"
        className="w-[65px] h-[65px] object-cover rounded-md flex-none"
      />
      <div className="flex flex-col justify-between gap-2 whitespace-normal text-ellipsis overflow-hidden">
        <h3 className=" text-blue-600 text-[16px]">
          {truncateString(title, 50)}
        </h3>
        <div className="flex justify-between items-center w-full">
          <span className="font-medium text-sm text-green-500">{price}</span>
          <span className="font-medium text-sm text-gray-300">
            {formatTime(createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RelatedItem;
