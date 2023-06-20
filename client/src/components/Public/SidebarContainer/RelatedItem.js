import React from "react";
import {
  formatVietnameseText,
  truncateString,
} from "../../../utils/helper-function/convert";
import moment from "moment";
import "moment/locale/vi";
import icons from "../../../utils/icon/icons";
import { useNavigate } from "react-router-dom";
import { path } from "../../../utils/path/path";
const { AiFillStar } = icons;

const RelatedItem = ({ title, price, image, createdAt, stars, postId }) => {
  const navigate = useNavigate();

  const formatTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };
  // console.log(stars);
  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++) {
      stars.push(<AiFillStar className="star-item" size={18} color="yellow" />);
    }

    return stars;
  };
  return (
    <div
      className={`w-full flex items-start justify-start gap-3 border-b 
       "border-gray-300"
       border-dashed py-2 cursor-pointer`}
      onClick={() =>
        navigate(`${path.CHI_TIET}${formatVietnameseText(title)}/${postId}`)
      }
    >
      <img
        src={image[0]}
        alt="img"
        className="w-[65px] h-[65px] object-cover rounded-md flex-none"
      />
      <div className="flex flex-col justify-between gap-2 w-full">
        <h3
          className={` ${stars ? "text-red-500" : "text-blue-600"} text-[16px]`}
        >
          {handleStar(+stars)?.length > 0 &&
            handleStar(+stars).map((star, number) => {
              return <React.Fragment key={number}>{star}</React.Fragment>;
            })}
          {truncateString(title, 50)}
        </h3>
        <div className=" flex items-center justify-between w-full ">
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
