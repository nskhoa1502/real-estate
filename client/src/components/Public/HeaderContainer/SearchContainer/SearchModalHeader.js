import React from "react";
import icons from "../../../../utils/icon/icons";
const SearchModalHeader = ({ setIsShowModal }) => {
  const { GrLinkPrevious } = icons;
  return (
    <div className="h-[45px] border-b border-gray-200">
      <span className="h-[45px] flex items-center px-4">
        <GrLinkPrevious
          size={24}
          onClick={(e) => {
            e.stopPropagation();
            setIsShowModal(false);
          }}
        />
      </span>
    </div>
  );
};

export default SearchModalHeader;
