import React, { memo } from "react";

const InputForm = ({
  label,
  value,
  setValue,
  id,
  setInvalidFields,
  invalidFields,
  isPassword,
}) => {
  const handleChange = (e) => {
    setValue((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div>
      <label htmlFor={id} className="text-xs">
        {label}
      </label>
      <input
        type={isPassword ? "password" : "text"}
        id={id}
        className="outline-none bg-[#e8f0fe] p-2 rounded-sm w-full "
        value={value}
        onChange={handleChange}
        onFocus={() => setInvalidFields([])}
      />
      {invalidFields.length > 0 &&
        invalidFields.some((field) => field.name === id) && (
          <small className="text-md text-red-500">
            {invalidFields.find((field) => field.name === id).message}
          </small>
        )}
    </div>
  );
};

export default memo(InputForm);
