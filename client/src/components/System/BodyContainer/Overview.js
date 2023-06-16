import React, { useState } from "react";
import Select from "./Select";
import { useSelector } from "react-redux";
import InputReadOnly from "./InputReadOnly";
import InputForm from "./InputForm";

const Overview = () => {
  const { categories } = useSelector((state) => state.app);
  const [category, setCategory] = useState(null);
  const [target, setTarget] = useState(null);
  const { currentData } = useSelector((state) => state.auth);
  console.log(categories);

  const targets = [
    { code: "male", value: "Nam" },
    { code: "female", value: "Nữ" },
  ];
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
        <InputForm label="Tiêu đề" />
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
        <div className="w-1/2 flex flex-col gap-4">
          <InputReadOnly label="Thông tin liên hệ" value={currentData?.name} />
          <InputReadOnly
            label="Thông tin Điện thoại"
            value={currentData?.phone}
          />
          <InputForm label="Giá cho thuê" unit="đồng" />
          <InputForm label="Diện tích" unit={`m\u00B2`} />
          <Select
            label="Đối tượng cho thuê"
            options={targets}
            type="target"
            value={target}
            setValue={setTarget}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
