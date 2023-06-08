import React, { memo } from "react";

const InputForm = ({ label, value, setValue, id }) => {
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
      />
    </div>
  );
};

export default memo(InputForm);
