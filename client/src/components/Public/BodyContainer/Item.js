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
    <div className="flex items justify-between border-t border-orange-600 p-4">
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
              <AiFillStar className="star-item" size={26} color="yellow" />
              <AiFillStar className="star-item" size={26} color="yellow" />
              <AiFillStar className="star-item" size={26} color="yellow" />
              <AiFillStar className="star-item" size={26} color="yellow" />
              <AiFillStar className="star-item" size={26} color="yellow" />
              CHO THUÊ CĂN HỘ HOẶC VĂN PHÒNG LÀM VIỆC
            </div>
            <div className="w-[10%] flex justify-end">
              <BsFillBookmarkStarFill size={24} color="orange" />
            </div>
          </div>
          <div className="flex justify-between items-center mb-5">
            <span className="font-bold text-green-600">3.3 triệu/tháng</span>
            <span>27m2</span>
            <span>Quận Bình tân, Hồ Chí Minh</span>
          </div>
          <p className="text-grey-500">
            Giá Phòng từ 1800k (hiện vẫn còn phòng 1800k ) đến xem đảm bảo ưng
            ý, cam kết hình đúng với thực tếPhòng mới sửa chữa 7/2022 , địa chỉ
            48/13 Lương…
          </p>
          <div className="flex items-center justify-between my-5">
            <div className="flex items-center justify-between gap-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRHtC9h0KhtCIFwRj4LsiPAyFKw9vAD0gAq7w4QLf7VQ&s"
                alt="avatar"
                className="w-[30px] h-[30px] rounded-full object-cover"
              />
              <p>Nguyễn Văn A</p>
            </div>
            <div className="flex justify-between gap-3 text-sm ">
              <button
                type="button"
                className="text-white bg-primaryBlue rounded-md px-1 cursor-pointer "
              >
                Gọi 12345566765
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
