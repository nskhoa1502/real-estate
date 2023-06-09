import React, { memo } from "react";

const Button = ({
  text,
  textColor,
  bgColor,
  Icons,
  order,
  onClick,
  fullWidth,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`py-2 px-1 ${textColor} ${bgColor} ${
        fullWidth && "w-full"
      } outline-none rounded-md hover:underline flex items-center justify-center gap-1`}
    >
      {order === "before" && <span> {Icons && <Icons />}</span>}
      <span className="mx-1">{text}</span>
      {order === "after" && <span> {Icons && <Icons />}</span>}
    </button>
  );
};

// Only re-render when props changed
export default memo(Button);
