import React, { memo } from "react";

const InputForm = ({
  label,
  value,
  setValue,
  id,
  setInvalidFields,
  invalidFields,
}) => {
  const handleChange = (e) => {
    setValue((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div>
      <label htmlFor="phone" className="text-xs">
        {label}
      </label>
      <input
        type="text"
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
