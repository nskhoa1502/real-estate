import React from "react";

const Button = ({ text, textColor, bgColor, Icons, order }) => {
  return (
    <button
      type="button"
      className={`py-2 px-1 ${textColor} ${bgColor} outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
    >
      {order === "before" && <span> {Icons && <Icons />}</span>}
      <span className="mx-1">{text}</span>
      {order === "after" && <span> {Icons && <Icons />}</span>}
    </button>
  );
};

export default Button;
