import React, { memo } from "react";

const SearchItem = ({ IconBefore, IconAfter, text, bold, filterText }) => {
  return (
    <>
      <div className="bg-white py-2 px-4 w-full rounded-md text-gray-500    flex justify-between gap-2 items-center text-ellipsis whitespace-nowrap overflow-hidden">
        <div className="flex items-center justify-start gap-1">
          {IconBefore}
          <span
            className={
              bold &&
              `font-medium text-black ${
                filterText ? "font-medium text-black" : ""
              }   text-ellipsis overflow-hidden whitespace-nowrap`
            }
          >
            {filterText || text}
          </span>
        </div>

        {IconAfter}
      </div>
    </>
  );
};

export default memo(SearchItem);
