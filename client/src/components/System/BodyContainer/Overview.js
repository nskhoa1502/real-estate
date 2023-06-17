import React, { useEffect, useState } from "react";
import Select from "./Select";
import { useSelector } from "react-redux";
import InputReadOnly from "./InputReadOnly";
import InputForm from "./InputForm";
import { extractCategoryCode } from "../../../utils/helper-function/convert";

const Overview = ({ payload, setPayload, invalidFields, setInvalidFields }) => {
  const { categories } = useSelector((state) => state.app);

  const { currentData } = useSelector((state) => state.auth);
  //   console.log(categories);

  const targets = [
    { code: "Nam", value: "Nam" },
    { code: "Nữ", value: "Nữ" },
  ];
  // console.log(payload);
  return (
    <div>
      <h2 className="font-medium text-xl py-4">Thông tin mô tả</h2>
      <div className="w-full flex flex-col gap-6">
        <div className="w-1/2">
          <Select
            options={categories}
            label="Loại chuyên mục"
            type="category"
            value={payload?.categoryCode}
            setValue={setPayload}
            field="categoryCode"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        </div>
        <InputForm
          value={payload?.title}
          setValue={setPayload}
          label="Tiêu đề"
          field="title"
          invalidFields={invalidFields}
          setInvalidFields={setInvalidFields}
        />
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="description">Nội dung mô tả</label>
          <textarea
            cols="30"
            rows="10"
            type="text"
            id="description"
            className="w-full rounded-md outline-none border border-gray-300"
            value={payload?.description}
            onChange={(e) =>
              setPayload((prev) => ({ ...prev, description: e?.target?.value }))
            }
          />
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <InputReadOnly label="Thông tin liên hệ" value={currentData?.name} />
          <InputReadOnly
            label="Thông tin Điện thoại"
            value={currentData?.phone}
          />
          <InputForm
            text="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
            label="Giá cho thuê"
            unit="đồng"
            field="priceNumber"
            value={payload?.priceNumber}
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <InputForm
            label="Diện tích"
            unit={`m\u00B2`}
            field="areaNumber"
            value={payload?.areaNumber}
            setValue={setPayload}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Select
            label="Tất cả"
            options={targets}
            type="target"
            value={payload?.target}
            setValue={setPayload}
            field="target"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
