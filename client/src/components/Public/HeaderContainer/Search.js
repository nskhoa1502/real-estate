import React from "react";
import { SearchItem } from "../../../UI";
import icons from "../../../utils/icon/icons";

const {
  BsChevronRight,
  GrLocation,
  RiCrop2Line,
  TbReportMoney,
  LuHotel,
  CiSearch,
} = icons;

const Search = () => {
  return (
    <div className="h-[55px] border border-red-500 p-[10px] bg-[#febb02] rounded-lg flex items-center justify-around gap-2 w-3/5 my-2 ">
      <SearchItem
        text="Phòng trọ, nhà trọ"
        IconBefore={<LuHotel />}
        bold={true}
      />
      <SearchItem
        text="Toàn quốc"
        IconAfter={<BsChevronRight color="#9CA3AF" />}
        IconBefore={<GrLocation />}
      />
      <SearchItem
        text="Chọn giá"
        IconAfter={<BsChevronRight color="#9CA3AF" />}
        IconBefore={<TbReportMoney />}
      />
      <SearchItem
        text="Chọn diện tích"
        IconAfter={<BsChevronRight color="#9CA3AF" />}
        IconBefore={<RiCrop2Line />}
      />
      <button
        type="button"
        className="outline-none py-2 px-4 w-full border bg-primaryBlue text-sm flex items-center justify-center gap-2 text-white font-medium"
      >
        <CiSearch size={20} /> Tìm kiếm
      </button>
    </div>
  );
};

export default Search;
