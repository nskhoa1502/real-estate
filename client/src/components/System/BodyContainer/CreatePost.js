import React from "react";
import Overview from "./Overview";
import Address from "./Address";
import icons from "../../../utils/icon/icons";

const { BsCameraFill } = icons;

const CreatePost = () => {
  return (
    <div className="px-6">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        Đăng tin mới
      </h1>
      <div className="flex gap-4">
        <div className="py-4 flex flex-col gap-8 flex-auto">
          <Address />
          <Overview />
          <div className="w-full">
            <h2 className="font-medium text-xl py-4">Hình ảnh</h2>
            <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            <div className="w-full">
              <label
                htmlFor="file"
                className="w-full border-2 flex flex-col border-dashed border-gray-400 h-[300px] rounded-md items-center justify-center my-4 gap-4"
              >
                <BsCameraFill size={60} color="blue" />
                Thêm ảnh
              </label>
              <input hidden type="file" id="file" />
            </div>
          </div>
        </div>
        <div className="w-[30%] flex-none">Bản đồ</div>
      </div>
      <div className="h-[500px]"></div>
    </div>
  );
};

export default CreatePost;
