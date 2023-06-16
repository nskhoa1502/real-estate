import React from "react";

const InputReadOnly = ({ label, value }) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <label htmlFor="exact-address" className="font-medium text-xl">
        {label}
      </label>
      <input
        id="exact-address"
        type="text"
        readOnly
        className="border border-gray-200 rounded-md bg-gray-100 p-2 outline-none"
        value={value}
      />
    </div>
  );
};

export default InputReadOnly;
