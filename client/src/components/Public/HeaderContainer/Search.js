import React, { useState } from "react";
import { SearchItem } from "../../../UI";
import icons from "../../../utils/icon/icons";
import SearchModal from "../../../UI/SearchModal";

const {
  BsChevronRight,
  GrLocation,
  RiCrop2Line,
  TbReportMoney,
  LuHotel,
  CiSearch,
} = icons;

const Search = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [content, setContent] = useState(false);

  const handleShowModal = (content) => {
    setIsShowModal(true);
    setContent(content);
  };
  return (
    <div className="h-[55px] border border-red-500 p-[10px] bg-[#febb02] rounded-lg flex items-center justify-around gap-2 w-3/5 my-2 ">
      <span
        onClick={() => handleShowModal("Phòng trọ, nhà trọ")}
        className="flex-1 cursor-pointer"
      >
        <SearchItem
          text="Phòng trọ, nhà trọ"
          IconBefore={<LuHotel />}
          bold={true}
        />
      </span>
      <span
        onClick={() => handleShowModal("Toàn quốc")}
        className="flex-1 cursor-pointer"
      >
        <SearchItem
          text="Toàn quốc"
          IconAfter={<BsChevronRight color="#9CA3AF" />}
          IconBefore={<GrLocation />}
        />
      </span>
      <span
        onClick={() => handleShowModal("Chọn giá")}
        className="flex-1 cursor-pointer"
      >
        <SearchItem
          text="Chọn giá"
          IconAfter={<BsChevronRight color="#9CA3AF" />}
          IconBefore={<TbReportMoney />}
        />
      </span>

      <span
        onClick={() => handleShowModal("Chọn diện tích")}
        className="flex-1 cursor-pointer"
      >
        <SearchItem
          text="Chọn diện tích"
          IconAfter={<BsChevronRight color="#9CA3AF" />}
          IconBefore={<RiCrop2Line />}
        />
      </span>

      <button
        type="button"
        className="outline-none py-2 px-4 flex-1 border bg-primaryBlue text-sm flex items-center justify-center gap-2 text-white font-medium"
      >
        <CiSearch size={20} /> Tìm kiếm
      </button>
      {isShowModal && (
        <SearchModal content={content} setIsShowModal={setIsShowModal} />
      )}
    </div>
  );
};

export default Search;
