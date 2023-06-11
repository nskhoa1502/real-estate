import React from "react";

const RelatedItem = () => {
  return (
    <div className="w-full flex items-center justify-start gap-1 border-b border-gray-300 border-dashed py-2">
      <img
        src="https://lnsel.com/wp-content/uploads/2018/12/anon-avatar-300x300.png"
        alt="img"
        className="w-[65px] h-[65px] object-cover rounded-md"
      />
      <div className="flex flex-col justify-between gap-2 whitespace-nowrap text-ellipsis overflow-hidden">
        <h3 className=" text-blue-600">
          Phòng trọ ngay Thành Thái, trung tâm Quận 10, đẹp, trang bị đầy đủ nội
          thất
        </h3>
        <div className="flex justify-between items-center">
          <span>price</span>
          <span>time</span>
        </div>
      </div>
    </div>
  );
};

export default RelatedItem;
