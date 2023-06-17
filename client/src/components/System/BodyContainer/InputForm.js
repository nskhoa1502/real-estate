import React from "react";

const InputForm = ({ label, unit, value, setValue, field, text }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label htmlFor="Title">{label}</label>
      <div className="flex items-center ">
        <input
          type="text"
          id="title"
          value={value || ""}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, [field]: e?.target?.value }))
          }
          className={`p-2 w-full ${
            unit ? "rounded-tl-md rounded-bl-md" : "rounded-md"
          } outline-none border border-gray-300 flex-auto h-full`}
        />
        {unit && (
          <span className="p-2 flex-none w-16 flex items-center justify-center bg-gray-200 rounded-tr-md rounded-br-md h-full ">
            {unit}
          </span>
        )}
      </div>
      <small className="opacity-70">{text}</small>
    </div>
  );
};

export default InputForm;