import React from "react";

const Select = ({ label, options, value, setValue, type }) => {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <label htmlFor="select-address">{label}</label>
      <select
        id="select-address"
        value={value}
        onChange={(e) => setValue(e?.target?.value)}
        className="outline-none border border-gray-300 p-2 rounded-md w-full"
      >
        <option value="" className="">
          {`--Chọn ${label}--`}
        </option>
        {options?.map((item) => {
          if (type === "province") {
            return (
              <option value={item?.province_id} key={item?.province_id}>
                {item.province_name}
              </option>
            );
          }
          if (type === "district") {
            return (
              <option value={item?.district_id} key={item?.district_id}>
                {item?.district_name}
              </option>
            );
          }
          if (type === "ward") {
            return (
              <option value={item?.ward_id} key={item?.ward_id}>
                {item?.ward_name}
              </option>
            );
          }
          if (type === "category") {
            return (
              <option value={item?.value} key={item?.code}>
                {item?.value}
              </option>
            );
          }

          return null;
        })}
      </select>
    </div>
  );
};

export default Select;
