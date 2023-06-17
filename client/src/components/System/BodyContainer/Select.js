import React, { useState } from "react";

const Select = ({
  label,
  options,
  value,
  setValue,
  type,
  field,
  invalidFields,
  setInvalidFields,
}) => {
  const handleSelect = (e) => {
    !field
      ? setValue(e?.target?.value)
      : setValue((prev) => ({ ...prev, [field]: e?.target.value }));
  };

  const handleErrorText = () => {
    if (type === "province" || type === "district" || type === "ward") {
      const addressInvalid = invalidFields.find(
        (item) => item.name === "address"
      );
      return addressInvalid ? addressInvalid.message : "";
    }

    const fieldError = invalidFields.find((item) => item.name === field);

    if (fieldError) {
      return fieldError.message;
    }

    return "";
  };

  return (
    <div className="flex flex-col gap-2 flex-1">
      <label htmlFor="select-address">{label}</label>
      <select
        id="select-address"
        value={value}
        onChange={handleSelect}
        className="outline-none border border-gray-300 p-2 rounded-md w-full"
        onFocus={() => setInvalidFields([])}
      >
        <option value="" className="">
          {field === "target" ? "Tất cả" : `--Chọn ${label}--`}
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
              <option value={item?.code} key={item?.code}>
                {item?.value}
              </option>
            );
          }
          if (type === "target") {
            return (
              <option value={item?.code} key={item?.code}>
                {item?.value}
              </option>
            );
          }

          return null;
        })}
      </select>
      {invalidFields && invalidFields?.length > 0 && (
        <small className="text-red-500">{handleErrorText()}</small>
      )}
    </div>
  );
};

export default Select;
