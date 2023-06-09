import React, { memo, useState } from "react";
import icons from "../../../utils/icon/icons";
import { truncateString } from "../../../utils/helper-function/convert";

const { AiFillStar, AiOutlineHeart, AiFillHeart, BsFillBookmarkStarFill } =
  icons;

const indexes = [0, 1, 2, 3];

const Item = ({
  images,
  address,
  attributes,
  description,
  star,
  title,
  user,
}) => {
  const [isHoverHeart, setIsHoverHeart] = useState(false);

  const filteredImages =
    images.length > 0 &&
    images.filter((img, index) => indexes.some((i) => i === index));

  const addressArr = address.split(",");

  return (
    <div className="flex items justify-between border-t border-orange-600 p-6">
      <div className="w-2/5 flex justify-center items-center">
        <div className="flex flex-wrap gap-[2px] relative cursor-pointer ">
          {filteredImages &&
            filteredImages?.map((image, i) => (
              <React.Fragment key={i}>
                <img
                  src={image}
                  alt={`Ảnh ${i + 1}`}
                  className="w-[150px] h-[130px] object-cover"
                />
              </React.Fragment>
            ))}

          <span className="bg-overlay-50  text-white px-2 rounded-md absolute bottom-1 left-1">
            {`${images.length} ảnh`}
          </span>
          <span
            className="absolute top-1 left-2 text-red-500 "
            onMouseEnter={() => setIsHoverHeart(true)}
            onMouseOut={() => setIsHoverHeart(false)}
          >
            {isHoverHeart ? (
              <AiFillHeart size={24} />
            ) : (
              <AiOutlineHeart size={24} />
            )}
          </span>
        </div>
      </div>
      <div className="w-3/5">
        <div>
          <div className="flex items-start gap-4">
            <div>
              <AiFillStar className="star-item" size={26} color="yellow" />
              <AiFillStar className="star-item" size={26} color="yellow" />
              <AiFillStar className="star-item" size={26} color="yellow" />
              <AiFillStar className="star-item" size={26} color="yellow" />
              <AiFillStar className="star-item" size={26} color="yellow" />
              <span className="text-lg font-bold text-red-500"> {title}</span>
            </div>
            <div className="w-[10%] flex justify-end">
              <BsFillBookmarkStarFill size={24} color="orange" />
            </div>
          </div>
          <div className="flex justify-between items-center mb-5 gap-2">
            <span className="flex-3 font-bold text-green-600 whitespace-nowrap text-ellipsis overflow-hidden">
              {attributes?.price}
            </span>
            <span className="flex-1">{attributes?.acreage}</span>
            <span className="flex-3 whitespace-nowrap text-ellipsis overflow-hidden">{`${
              addressArr[addressArr.length - 2]
            }, ${addressArr[addressArr.length - 1]}`}</span>
          </div>
          <p className="text-grey-500 w-full heigh-[50px] text-ellipsis overflow-hidden">
            {truncateString(description, 2)}
          </p>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center justify-between gap-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRHtC9h0KhtCIFwRj4LsiPAyFKw9vAD0gAq7w4QLf7VQ&s"
                alt="avatar"
                className="w-[30px] h-[30px] rounded-full object-cover"
              />
              <p>{user?.name}</p>
            </div>
            <div className="flex justify-between gap-3 text-sm ">
              <button
                type="button"
                className="text-white bg-primaryBlue rounded-md px-1 cursor-pointer "
              >
                {`Gọi ${user?.phone}`}
              </button>
              <button
                type="button"
                className="text-blue-700 border border-blue-700  rounded-md px-1 hover:text-white hover:bg-primaryBlue cursor-pointer"
              >
                Nhắn Zalo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Item);
