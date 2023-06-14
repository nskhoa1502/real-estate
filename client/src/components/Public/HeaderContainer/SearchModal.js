import React, { useState, useEffect } from "react";
import icons from "../../../utils/icon/icons";
import {
  mapPercentagesToRange,
  mapRangeToPercentage,
} from "../../../utils/helper-function/convert";
import { extractNumbers } from "../../../utils/helper-function/extractNumbers";
import { getCode } from "../../../utils/helper-function/getCode";

const { GrLinkPrevious } = icons;

const SearchModal = ({
  setIsShowModal,
  content,
  name,
  setFilterText,
  setFilterQueries,
  queries,
  arrMinMax,
  setArrMinMax,
}) => {
  const [percent1, setPercent1] = useState(0);
  const [percent2, setPercent2] = useState(100);

  // console.log(arrMinMax[0]);
  // console.log(arrMinMax[1]);
  // const [percent1, setPercent1] = useState(0);
  // const [percent2, setPercent2] = useState(100);

  const mapPercentagesToPrice = (value) => {
    return mapPercentagesToRange(value, 0, 15, 0.5);
  };
  const mapPercentagesToArea = (value) => {
    return mapPercentagesToRange(value, 0, 90, 5);
  };

  const mapPriceToPercentage = (value) => {
    return mapRangeToPercentage(value, 0, 15, 0.5);
  };

  const mapAreaToPercentage = (value) => {
    return mapRangeToPercentage(value, 0, 90, 5);
  };
  // console.log(mapPercentagesToPrice(percent2));
  useEffect(() => {
    const activeTrackEl = document.querySelector("#track-active");

    if (activeTrackEl) {
      const [minPercent, maxPercent] =
        percent1 > percent2
          ? [percent2, 100 - percent1]
          : [percent1, 100 - percent2];

      activeTrackEl.style.left = `${minPercent}%`;
      activeTrackEl.style.right = `${maxPercent}%`;
    }
  }, [percent1, percent2]);

  const handleClickTrack = (e, value) => {
    e.stopPropagation();
    const inactiveTrackEl = document.querySelector("#track-inactive");
    const inactiveTrackRect = inactiveTrackEl.getBoundingClientRect();
    const percent =
      value === 0 || value
        ? value
        : ((e.clientX - inactiveTrackRect.left) * 100) /
          inactiveTrackRect.width;

    if (Math.abs(percent - percent1) <= Math.abs(percent - percent2)) {
      setPercent1(percent);
    } else {
      setPercent2(percent);
    }
  };

  const handleButtonFilter = (valueString) => {
    const filterValueArr = extractNumbers(valueString);

    if (filterValueArr.length === 1) {
      if (filterValueArr[0] === 1) {
        setPercent1(0);
        setPercent2(mapPriceToPercentage(1));
      }
      if (filterValueArr[0] === 15) {
        setPercent1(100);
        setPercent2(100);
      }

      if (filterValueArr[0] === 20) {
        setPercent1(0);
        setPercent2(mapAreaToPercentage(20));
      }
      if (filterValueArr[0] === 90) {
        setPercent1(100);
        setPercent2(100);
      }
    }

    if (filterValueArr.length === 2) {
      if (filterValueArr[0] <= 15 && filterValueArr[1] <= 15) {
        setPercent1(mapPriceToPercentage(filterValueArr[0]));
        setPercent2(mapPriceToPercentage(filterValueArr[1]));
      }

      if (filterValueArr[0] >= 20 && filterValueArr[1] >= 20) {
        setPercent1(mapAreaToPercentage(filterValueArr[0]));
        setPercent2(mapAreaToPercentage(filterValueArr[1]));
      }
    }
  };

  const handleCateAndProvSubmit = (e, value) => {
    e.stopPropagation();

    const queryKey =
      name === "category"
        ? "categoryCode"
        : name === "province"
        ? "provinceCode"
        : name === "price"
        ? "priceCode"
        : "areaCode";

    if (name === "category" || name === "province") {
      setFilterText((prev) => ({
        ...prev,
        [name]: value,
      }));

      setFilterQueries((prev) => ({
        ...prev,
        [queryKey]: e.target.value,
      }));
    }

    setIsShowModal(false);
  };

  const handlePriceAndAreaSubmit = (e, value) => {
    e.stopPropagation();
    setFilterQueries((prev) => ({
      ...prev,
      [`${name}Code`]: value[`${name}Code`]?.map((i) => i.code),
    }));

    let textValue;

    if (name === "price" && percent1 === 100 && percent2 === 100) {
      textValue = `Trên ${mapPercentagesToPrice(100)} triệu`;
    } else if (name === "area" && percent1 === 100 && percent2 === 100) {
      textValue = `Trên ${mapPercentagesToArea(100)}m`;
    } else {
      textValue = value[`${name}`];
    }

    setFilterText((prev) => ({
      ...prev,
      [name]: textValue,
      // [`${name}Rage`]: [percent1, percent2],
    }));

    setIsShowModal(false);
  };

  return (
    <div
      onClick={() => setIsShowModal(false)}
      className="fixed top-0 left-0 right-0 bottom-0 bg-overlay-30 z-20 flex items-center justify-center"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsShowModal(true);
        }}
        className="w-1/2 bg-white rounded-md border"
      >
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

        {(name === "category" || name === "province") && (
          <div className="p-4 flex flex-col">
            {content?.length > 0 &&
              content?.map((item) => (
                <span
                  key={item.code}
                  className="py-2 flex gap-2 icon border-b border-gray-200"
                >
                  <input
                    type="radio"
                    name={name}
                    value={item.code}
                    checked={
                      item.code === queries[`${name}Code`] ? true : false
                    }
                    id={item.code}
                    onChange={(e) => handleCateAndProvSubmit(e, item.value)}
                  />

                  <label htmlFor={item.code}>{item.value}</label>
                </span>
              ))}
          </div>
        )}

        {(name === "price" || name === "area") && (
          <>
            <div className="px-8 py-20">
              <div className="flex flex-col items-center justify-center relative">
                <div className="z-30 absolute top-[-40px] font-bold text-xl text-orange-600">
                  {name === "area"
                    ? mapPercentagesToArea(percent1) ===
                        mapPercentagesToArea(100) &&
                      mapPercentagesToArea(percent2) ===
                        mapPercentagesToArea(100)
                      ? `Trên ${mapPercentagesToArea(100)}+ m2`
                      : `Từ ${mapPercentagesToArea(
                          percent1 <= percent2 ? percent1 : percent2
                        )} đến ${mapPercentagesToArea(
                          percent2 >= percent1 ? percent2 : percent1
                        )}m^2`
                    : name === "price"
                    ? mapPercentagesToPrice(percent1) ===
                        mapPercentagesToPrice(100) &&
                      mapPercentagesToPrice(percent2) ===
                        mapPercentagesToPrice(100)
                      ? `Trên ${mapPercentagesToPrice(100)}+ triệu`
                      : `Từ ${mapPercentagesToPrice(
                          percent1 <= percent2 ? percent1 : percent2
                        )} đến ${mapPercentagesToPrice(
                          percent2 >= percent1 ? percent2 : percent1
                        )} triệu`
                    : null}
                </div>
                <div
                  id="track-inactive"
                  onClick={handleClickTrack}
                  className="slider-track bg-gray-300 h-[5px] absolute top-0 bottom-0 w-full rounded-full"
                ></div>
                <div
                  id="track-active"
                  onClick={handleClickTrack}
                  className="slider-track-active bg-orange-600 h-[5px] absolute top-0 bottom-0 rounded-full"
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
                    {name === "price"
                      ? `${mapPercentagesToPrice(100)} triệu`
                      : `${mapPercentagesToArea(100)} m^2`}
                  </span>
                </div>
              </div>
            </div>
            <h4 className="px-7 mb-3 font-medium">Chọn nhanh</h4>
            <div className="flex gap-3 items-center flex-wrap w-full px-7 pb-5">
              {content?.map((item) => (
                <button
                  key={item.code}
                  onClick={() => handleButtonFilter(item.value)}
                  className="px-4 py-2 bg-gray-200 text-black rounded-md cursor-pointer focus:bg-blue-500 focus:text-white hover:bg-blue-500 hover:text-white"
                >
                  {item.value}
                </button>
              ))}
            </div>
          </>
        )}
        {(name === "price" || name === "area") && (
          <button
            type="button"
            className="w-full py-3 bg-orange-400 text-lg font-semi rounded-bl-md rounded-br-md hover:underline"
            onClick={(e) => {
              e.stopPropagation();

              const rangeValue = [
                name === "price"
                  ? mapPercentagesToPrice(percent1)
                  : mapPercentagesToArea(percent1),
                name === "price"
                  ? mapPercentagesToPrice(percent2)
                  : mapPercentagesToArea(percent2),
              ];

              const codeValue = getCode(rangeValue, content);
              const textValue = `Từ ${rangeValue[0]} đến ${rangeValue[1]} ${
                name === "price" ? "triệu" : "m"
              }`;

              handlePriceAndAreaSubmit(e, {
                [`${name}Range`]: rangeValue,
                [`${name}Code`]: codeValue,
                [name]: textValue,
              });
            }}
          >
            Áp dụng
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
