import React, { memo, useState } from "react";
import icons from "../../../utils/icon/icons";
import {
  formatVietnameseText,
  truncateString,
} from "../../../utils/helper-function/convert";
import { Link } from "react-router-dom";
import { path } from "../../../utils/path/path";

const { AiFillStar, AiOutlineHeart, AiFillHeart, BsFillBookmarkStarFill } =
  icons;

// const indexes = [0, 1, 2, 3];

// ===========================
const Item = ({
  images,
  address,
  attributes,
  description,
  star,
  title,
  user,
  id,
}) => {
  const [isHoverHeart, setIsHoverHeart] = useState(false);

  const filteredImages =
    images.length > 0 &&
    images.filter((img, index) =>
      [...Array(4).keys()].some((i) => i === index)
    );

  const addressArr = address.split(",");

  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++) {
      stars.push(<AiFillStar className="star-item" size={26} color="yellow" />);
    }

    return stars;
  };

  return (
    <div className="flex items justify-between border-t border-orange-600 ">
      <Link
        to={`${path.CHI_TIET}${formatVietnameseText(title)}/${id}`}
        className="w-2/5 flex justify-center items-center"
      >
        <div className="flex flex-wrap gap-[2px] relative cursor-pointer py-6">
          {filteredImages &&
            filteredImages?.map((image, i) => (
              <React.Fragment key={i}>
                <img
                  src={image}
                  alt={`Ảnh ${i + 1}`}
                  className="w-[45%] h-[140px] object-cover"
                />
              </React.Fragment>
            ))}

          <span className="bg-overlay-50  text-white px-2 rounded-md absolute bottom-8 left-1">
            {`${images.length} ảnh`}
          </span>
          <span
            className="absolute top-8 left-2 text-red-500 "
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
      </Link>
      <div className="w-3/5 pb-5 pt-10 ">
        <div>
          <div className="flex items-start gap-4">
            <div>
              {handleStar(+star)?.length > 0 &&
                handleStar(+star).map((star, number) => {
                  return <React.Fragment key={number}>{star}</React.Fragment>;
                })}
              <Link
                to={`${path.CHI_TIET}${formatVietnameseText(title)}/${id}`}
                className="text-lg font-bold text-red-500"
              >
                {" "}
                {title}
              </Link>
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
            }, ${addressArr[addressArr.length - 1]
              .trim()
              .replace(/^(Thành phố |Tỉnh)/, "")}`}</span>
          </div>
          <p className="text-grey-500 w-full heigh-[50px] ">
            {truncateString(
              typeof description === "string"
                ? description
                : description?.join(" "),
              100
            )}
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
