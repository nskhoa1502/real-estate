import React from "react";

const InputReadOnly = ({ label, value, flexDirection, editPhone }) => {
  return (
    <div
      className={`flex ${
        flexDirection ? flexDirection + " gap-2" : "flex-col gap-4"
      } w-full`}
    >
      <label htmlFor="exact-address" className="font-medium text-xl w-[200px]">
        {label}
      </label>
      <div className="flex-auto flex flex-col">
        <input
          id="exact-address"
          type="text"
          readOnly
          className="border border-gray-200 rounded-md bg-gray-100 p-2 outline-none w-full"
          value={value || ""}
        />
        {editPhone && (
          <small className="text-blue-500 mt-3 mb-10 cursor-pointer">
            Đổi số điện thoại
          </small>
        )}
      </div>
    </div>
  );
};

export default InputReadOnly;
