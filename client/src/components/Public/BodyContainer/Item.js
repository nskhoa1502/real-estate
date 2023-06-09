import React, { memo } from "react";
import icons from "../../../utils/icon/icons";

const images = [
  "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2023/04/05/55637145-578245875989817-2843045484099010560-n_1680647150.jpg",
  "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2023/04/05/z4238505177386-575ad5f9b15a5c77ccec70b00ed0d246_1680647148.jpg",
  "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2023/04/05/z4238505178565-c387b8857cfee5a095ae7fc633069100_1680647148.jpg",
  "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2023/04/05/z4238505179289-b10b006898b78f297c6bc0e344571970_1680647149.jpg",
];

const { CiSearch, AiFillStar, AiFillHeart, BsFillBookmarkStarFill } = icons;

const Item = () => {
  return (
    <div className="flex items justify-between ">
      <div className="w-2/5">
        <div className="flex flex-wrap gap-[2px]">
          <img
            src={images[0]}
            alt="previos"
            className="w-[140px] h-[120px] object-cover"
          />
          <img
            src={images[1]}
            alt="previos"
            className="w-[140px] h-[120px] object-cover"
          />
          <img
            src={images[2]}
            alt="previos"
            className="w-[140px] h-[120px] object-cover"
          />
          <img
            src={images[3]}
            alt="previos"
            className="w-[140px] h-[120px] object-cover"
          />
        </div>
      </div>
      <div className="w-3/5">
        <div>
          <div className="flex items-start gap-4">
            <div>
              <AiFillStar className="star-item" size={20} color="yellow" />
              <AiFillStar className="star-item" size={20} color="yellow" />
              <AiFillStar className="star-item" size={20} color="yellow" />
              <AiFillStar className="star-item" size={20} color="yellow" />
              <AiFillStar className="star-item" size={20} color="yellow" />
              CHO THUÊ CĂN HỘ HOẶC VĂN PHÒNG LÀM VIỆC
            </div>
            <div className="">
              <BsFillBookmarkStarFill />
            </div>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default memo(Item);
