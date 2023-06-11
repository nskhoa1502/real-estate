import React from "react";
import icons from "../utils/icon/icons";

const { GrLinkPrevious } = icons;

const SearchModal = ({ setIsShowModal, content, name }) => {
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
        <div className="h-[45px] border-b border-gray-200">
          <span className="h-[45px] flex items-center px-4 ">
            {" "}
            <GrLinkPrevious
              size={24}
              onClick={(e) => {
                e.stopPropagation();
                setIsShowModal(false);
              }}
            />
          </span>
        </div>
        <div className="p-4 flex flex-col">
          {content?.length > 0 &&
            content?.map((item) => {
              return (
                <span
                  key={item.code}
                  className="py-2 flex gap-2 icon border-b border-gray-200"
                >
                  <input
                    type="radio"
                    name={name}
                    value={item.code}
                    id={item.code}
                  />
                  <label htmlFor={item.code}>{item.value}</label>
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
