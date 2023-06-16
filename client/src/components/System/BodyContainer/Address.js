import React from "react";
import SelectAddress from "./SelectAddress";

const Address = () => {
  return (
    <div>
      <h2 className="font-medium text-xl py-4">Địa chỉ cho thuê</h2>
      <div className="flex flex-col gap-10">
        <div className="flex items-center gap-4">
          <SelectAddress label="Tỉnh/Thành phố" />
          <SelectAddress label="Quận/Huyện" />
        </div>
        <div className="flex flex-col w-full gap-4">
          <span className="font-medium text-xl">Địa chỉ chính xác</span>
          <input
            type="text"
            readOnly
            className="border border-gray-200 rounded-md bg-gray-100 p-2 outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default Address;
