import React from "react";
import icons from "../utils/icon/icons";

const { GrLinkPrevious } = icons;

const SearchModal = ({ setIsShowModal, content }) => {
  return (
    <div
      onClick={(e) => {
        setIsShowModal(false);
      }}
      className="fixed top-0 left-0 right-0 bottom-0 bg-overlay-30 z-20 flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsShowModal(true);
        }}
        className="w-1/3 bg-white rounded-md border "
      >
        <div className="h-[45px] border-b border-gray-100">
          <span className="h-[45px] flex items-center px-4 ">
            {" "}
            <GrLinkPrevious size={24} />
          </span>
        </div>
        <div className="p-4">{content}</div>
      </div>
    </div>
  );
};

export default SearchModal;
