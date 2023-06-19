import React, { memo } from "react";
import { text } from "../../../utils/constant/data-info";
import icons from "../../../utils/icon/icons";
import { Button } from "../../../UI";

const Info = () => {
  const { AiFillStar } = icons;
  const star = [1, 2, 3, 4, 5];

  return (
    <div className=" w-full bg-white rounded-md shadow-md flex justify-center items-center p-2 flex-col gap-3">
      <h3 className="font-bold text-xl">{text.title}</h3>
      <p className="text-gray-800 text-center">
        {text.description1}
        <span>
          {/* {categories.length > 0 &&
            categories?.map((category) => {
              return (
                <Link
                  to={`/${formatVietnameseText(category.value)}`}
                  key={category.code}
                  className="text-blue-500 font-medium hover:underline hover:text-orange-500"
                >
                  {`${category.value.toLowerCase()}. `}
                </Link>
              );
            })} */}
        </span>
        {text.description2}
      </p>
      <div className="flex items-center justify-around w-full">
        {text.statistics.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <h4 className="font-bold text-xl">{item.value}</h4>
              <p className="text-gray-700">{item.name}</p>
            </div>
          );
        })}
      </div>
      <h3 className="font-bold text-xl py-2">{text.incentive}</h3>
      <div className="flex">
        {star.map((item) => {
          return (
            <span key={item}>
              <AiFillStar color="yellow" size={30} />
            </span>
          );
        })}
      </div>
      <p className="text-gray-700 italic text-center p-2">{text.comment}</p>
      <span className="text-gray-700">{text.author}</span>
      <h3 className="font-bold text-lg py-2">{text.question}</h3>
      <p>{text.answer}</p>
      <Button
        text="Đăng ký ngay"
        bgColor={`bg-primaryRed`}
        textColor={`text-white`}
        px="px-6"
      />
      <div className="h-[32px]"></div>
    </div>
  );
};

export default memo(Info);
