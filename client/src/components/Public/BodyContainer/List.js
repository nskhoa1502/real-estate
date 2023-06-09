import React from "react";
import { Button } from "../../../UI";
import Item from "./Item";

const List = () => {
  return (
    <div className="w-full p-2 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-semibold my-3">Danh sách tin đăng</h4>
        <span>Cập nhật: 12:05 25/08/2022</span>
      </div>
      <div className="flex items-center gap-1 my-3">
        <span>Sắp xếp:</span>
        <Button bgColor={`bg-gray-200`} text={"Mặc định"} />
        <Button bgColor={`bg-gray-200`} text={"Mới nhất"} />
      </div>
      <div className="items">
        <Item />
      </div>
    </div>
  );
};

export default List;
