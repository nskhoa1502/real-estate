import React, { memo } from "react";

const SearchItem = ({ IconBefore, IconAfter, text, bold }) => {
  return (
    <div className="bg-white py-2 px-4 w-full rounded-md text-gray-500  max-[882px]:text-[8px] max-[1279px]:text-[10px] max-[1280px]:text-sm flex justify-between gap-2 items-center">
      <div className="flex items-center justify-start gap-1">
        {IconBefore}
        <span className={bold && "font-medium text-black"}> {text}</span>
      </div>

      {IconAfter}
    </div>
  );
};

export default memo(SearchItem);
