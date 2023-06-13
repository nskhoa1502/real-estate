import React, { useState, useEffect } from "react";
import icons from "../../../utils/icon/icons";
import {
  mapPercentagesToPrice,
  mapPriceToPercentage,
} from "../../../utils/helper-function/convert";
import { extractNumbers } from "../../../utils/helper-function/extractNumbers";

const { GrLinkPrevious } = icons;

const SearchModal = ({ setIsShowModal, content, name }) => {
  const [percent1, setPercent1] = useState(0);
  const [percent2, setPercent2] = useState(100);

  useEffect(() => {
    const activeTrackEl = document.querySelector("#track-active");

    if (activeTrackEl) {
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
    }
  }, [percent1, percent2]);

  const handleClickTrack = (e, value) => {
    e.stopPropagation();
    const inactiveTrackEl = document.querySelector("#track-inactive");
    const inactiveTrackRect = inactiveTrackEl.getBoundingClientRect();
    console.log(value);

    let percent =
      value === 0 || value
        ? value
        : ((e.clientX - inactiveTrackRect.left) * 100) /
          inactiveTrackRect.width;

    console.log(percent);
    if (Math.abs(percent - percent1) <= Math.abs(percent - percent2)) {
      setPercent1(percent);
    } else {
      setPercent2(percent);
    }
  };

  const handleButtonFilter = (valueString) => {
    const filterValueArr = extractNumbers(valueString);
    console.log(filterValueArr);
    console.log(mapPriceToPercentage(filterValueArr[0], 0, 15, 0.5));

    // Filter min,max
    if (filterValueArr.length === 1) {
      // Filter for price : min = 1, max = 15 triệu
      if (filterValueArr[0] === 1) {
        setPercent1(0);
        setPercent2(mapPriceToPercentage(1, 0, 15, 0.5));
      }
      if (filterValueArr[0] === 15) {
        setPercent1(100);
        setPercent2(100);
      }

      // Filter for area : min = 20 , max = 90
      if (filterValueArr[0] === 20) {
        setPercent1(0);
        setPercent2(mapPriceToPercentage(20, 20, 90, 5));
      }
      if (filterValueArr[0] === 90) {
        setPercent1(100);
        setPercent2(100);
      }
    }

    if (filterValueArr.length === 2) {
      // Filter for price
      if (filterValueArr[0] <= 15 && filterValueArr[1] <= 15) {
        setPercent1(mapPriceToPercentage(filterValueArr[0], 0, 15, 0.5));
        setPercent2(mapPriceToPercentage(filterValueArr[1], 0, 15, 0.5));
      }

      // Filter for area
      if (filterValueArr[0] >= 20 && filterValueArr[1] >= 20) {
        setPercent1(mapPriceToPercentage(filterValueArr[0], 20, 90, 5));
        setPercent2(mapPriceToPercentage(filterValueArr[1], 20, 90, 5));
      }
    }
  };

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
          <>
            <div className="px-8 py-20">
              <div className="flex flex-col items-center justify-center relative">
                <div className="z-30 absolute top-[-40px] font-bold text-xl text-orange-600">
                  {/* Từ 0 - 15 triệu + */}
                  {mapPercentagesToPrice(percent1, 0, 15, 0.5) ===
                    mapPercentagesToPrice(100, 0, 15, 0.5) &&
                  mapPercentagesToPrice(percent2, 0, 15, 0.5) ===
                    mapPercentagesToPrice(100, 0, 15, 0.5)
                    ? `Trên ${mapPercentagesToPrice(100, 0, 15, 0.5)}+ triệu`
                    : `Từ ${mapPercentagesToPrice(
                        percent1 <= percent2 ? percent1 : percent2,
                        0,
                        15,
                        0.5
                      )} đến ${mapPercentagesToPrice(
                        percent2 >= percent1 ? percent2 : percent1,
                        0,
                        15,
                        0.5
                      )} triệu`}
                </div>
                <div
                  id="track-inactive"
                  onClick={handleClickTrack}
                  className="slider-track bg-gray-300 h-[5px] absolute top-0 bottom-0 w-full rounded-full"
                ></div>
                <div
                  id="track-active"
                  onClick={handleClickTrack}
                  className={`slider-track-active bg-orange-600 h-[5px] absolute top-0 bottom-0 rounded-full `}
                ></div>
                <input
                  type="range"
                  max="100"
                  min="0"
                  step="1"
                  value={percent1}
                  className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                  onChange={(e) => setPercent1(+e.target.value)}
                />
                <input
                  type="range"
                  max="100"
                  min="0"
                  step="1"
                  value={percent2}
                  className="w-full appearance-none pointer-events-none absolute top-0 bottom-0"
                  onChange={(e) => setPercent2(+e.target.value)}
                />
                <div className="absolute z-30 top-6 left-0 right-0 flex justify-between items-center">
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickTrack(e, 0);
                    }}
                    className="cursor-pointer"
                  >
                    0
                  </span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClickTrack(e, 100);
                    }}
                    className="mr-[-12px] cursor-pointer"
                  >
                    15 triệu
                  </span>
                </div>
              </div>
            </div>
            <h4 className="px-7 mb-3 font-medium">Chọn nhanh</h4>
            <div className="flex gap-3 items-center flex-wrap w-full px-7 pb-5  ">
              {content?.map((item) => (
                <button
                  key={item.code}
                  onClick={() => handleButtonFilter(item.value)}
                  className="px-4 py-2 bg-gray-200 text-black rounded-md cursor-pointer focus:bg-blue-500  focus:text-white hover:bg-blue-500 hover:text-white "
                >
                  {item.value}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
