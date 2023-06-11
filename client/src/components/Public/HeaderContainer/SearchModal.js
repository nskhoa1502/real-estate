import React, { useState, useEffect } from "react";
import icons from "../../../utils/icon/icons";

const { GrLinkPrevious } = icons;

const SearchModal = ({ setIsShowModal, content, name }) => {
  const [percent1, setPercent1] = useState(100);
  const [percent2, setPercent2] = useState(0);

  useEffect(() => {
    const activeTrackEl = document.querySelector("#track-active");

    let minPercent;
    let maxPercent;
    if (percent1 > percent2) {
      minPercent = percent2;
      maxPercent = 100 - percent1;
    } else {
      minPercent = percent1;
      maxPercent = 100 - percent2;
    }

    activeTrackEl.style.left = `${minPercent}%`;
    activeTrackEl.style.right = `${maxPercent}%`;
  }, [percent1, percent2]);

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

        {(name === "category" || name === "province") && (
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
        )}

        {(name === "price" || name === "area") && (
          <div className="p-8">
            <div className="flex flex-col items-center justify-center relative">
              <div className="slider-track bg-gray-300 h-[5px] absolute top-0 bottom-0 w-full rounded-full"></div>
              <div
                id="track-active"
                className={`slider-track-active bg-orange-600 h-[5px] absolute top-0 bottom-0 rounded-full `}
              ></div>
              <input
                type="range"
                max="100"
                min="0"
                step="5"
                value={percent1}
                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                onChange={(e) => setPercent1(+e.target.value)}
              />
              <input
                type="range"
                max="100"
                min="0"
                step="5"
                value={percent2}
                className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                onChange={(e) => setPercent2(+e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
