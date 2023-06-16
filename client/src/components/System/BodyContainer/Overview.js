import React, { useState } from "react";
import Select from "./Select";
import { useSelector } from "react-redux";

const Overview = () => {
  const { categories } = useSelector((state) => state.app);
  const [category, setCategory] = useState(null);
  console.log(categories);
  return (
    <div>
      <h2 className="font-medium text-xl py-4">Thông tin mô tả</h2>
      <div className="w-full flex flex-col gap-6">
        <div className="w-1/2">
          <Select
            options={categories}
            label="Loại chuyên mục"
            type="category"
            value={category}
            setValue={setCategory}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="Title">Tiêu đề</label>
          <input
            type="text"
            id="title"
            className="w-full rounded-md outline-none border border-gray-300"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="description">Nội dung mô tả</label>
          <textarea
            cols="30"
            rows="10"
            type="text"
            id="description"
            className="w-full rounded-md outline-none border border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
