import React, { useState } from "react";
import { SearchItem } from "../../../UI";
import icons from "../../../utils/icon/icons";
import SearchModal from "./SearchModal";
import { useSelector } from "react-redux";

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
  const [content, setContent] = useState([]);
  const [name, setName] = useState("");
  const { provinces, areas, prices, categories } = useSelector(
    (state) => state.app
  );

  const handleShowModal = (content, name) => {
    setContent(content);
    setName(name);
    setIsShowModal(true);
  };
  return (
    <div className="h-[55px] border border-red-500 p-[10px] bg-[#febb02] rounded-lg flex items-center justify-around gap-2 w-3/5 my-2 ">
      <span
        onClick={() => handleShowModal(categories, `category`)}
        className="flex-1 cursor-pointer"
      >
        <SearchItem
          text="Phòng trọ, nhà trọ"
          IconBefore={<LuHotel />}
          bold={true}
        />
      </span>
      <span
        onClick={() => handleShowModal(provinces, `province`)}
        className="flex-1 cursor-pointer"
      >
        <SearchItem
          text="Toàn quốc"
          IconAfter={<BsChevronRight color="#9CA3AF" />}
          IconBefore={<GrLocation />}
        />
      </span>
      <span
        onClick={() => handleShowModal(prices, `price`)}
        className="flex-1 cursor-pointer"
      >
        <SearchItem
          text="Chọn giá"
          IconAfter={<BsChevronRight color="#9CA3AF" />}
          IconBefore={<TbReportMoney />}
        />
      </span>

      <span
        onClick={() => handleShowModal(areas, `area`)}
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
        <SearchModal
          content={content}
          setIsShowModal={setIsShowModal}
          name={name}
        />
      )}
    </div>
  );
};

export default Search;
