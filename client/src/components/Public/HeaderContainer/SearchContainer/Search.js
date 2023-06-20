import React, { useEffect, useState, useRef } from "react";
import SearchItem from "./SearchItem";
import icons from "../../../../utils/icon/icons";
import SearchModal from "./SearchModal";
import { useDispatch, useSelector } from "react-redux";
// import { getPostsFilter } from "../../../../redux/slices/postSlice";
import {
  useNavigate,
  createSearchParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { path } from "../../../../utils/path/path";
import { searchTitle } from "../../../../redux/slices/appSlice";

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
  const [arrMinMax, setArrMinMax] = useState([]);
  const [defaultText, setDefaultText] = useState("");
  const navigate = useNavigate();
  // const [arrMinMax, setArrMinMax] = useState([]);
  const dispatch = useDispatch();
  const location = useLocation();
  // console.log(location?.state);
  const prevPathRef = useRef();
  const [params, setParams] = useSearchParams();
  // const labelCode = params.get("labelCode") || null;
  // console.log(labelCode);
  // console.log(prices);
  // console.log(areas);
  // console.log(transformObj(prices));
  // console.log(transformObj(areas));

  // console.log(getCode([6.5, 14.5], prices));
  // console.log(getCode([35, 75], areas));

  const [filterText, setFilterText] = useState({
    category: "",
    province: "",
    area: "",
    price: "",
  });

  const [filterQueries, setFilterQueries] = useState({
    page: 1,
    // labelCode: labelCode ? labelCode : null,
  });

  // console.log(filterQueries);
  // console.log(filterText);

  // console.log(getCode(filterQueries?.priceCode, prices));
  // console.log(getCode(filterQueries?.areaCode, areas));

  const handleShowModal = (content, name, defaultText) => {
    setContent(content);
    setName(name);
    setIsShowModal(true);
    setDefaultText(defaultText);
  };

  const handleSearch = () => {
    const titleSearch = `${
      filterText.category || "Cho thuê phòng trọ, nhà trọ"
    } tại ${
      filterText.province ? `tỉnh ${filterText.province}` : `Toàn quốc`
    } ${filterText.price ? `với giá ${filterText.price.toLowerCase()}` : ""} ${
      filterText.area ? `với diện tích ${filterText.area.toLowerCase()}` : ""
    }`;

    // console.log(filterText);
    // console.log(filterQueries);

    dispatch(searchTitle(titleSearch));

    navigate(
      {
        pathname: path.TIM_KIEM,
        search: createSearchParams(filterQueries).toString(),
      }
      // { state: { titleSearch: titleSearch } }
    );
  };

  useEffect(() => {
    // console.log("Current path: ", location.pathname);
    // console.log("Previous path: ", prevPathRef.current);
    // console.log(path.TIM_KIEM);
    if (
      location.pathname !== `/${path.TIM_KIEM}` &&
      prevPathRef.current === `/${path.TIM_KIEM}`
    ) {
      // console.log("Resetting filters...");
      setArrMinMax([]);
      setFilterText({ category: "", province: "", area: "", price: "" });
      setFilterQueries({ page: 1 });
    }
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  return (
    <div className="h-[55px] border border-red-500 p-[10px] bg-[#febb02] rounded-lg flex items-center justify-around gap-2 w-[1100px] my-2 ">
      {/* <SearchModalHeader setIsShowModal={setIsShowModal} /> */}
      <span
        onClick={() => handleShowModal(categories, `category`, "Tìm tất cả")}
        className="flex-1 cursor-pointer"
      >
        <SearchItem
          text="Phòng trọ, nhà trọ"
          IconBefore={<LuHotel />}
          bold={true}
          filterText={filterText.category}
        />
      </span>
      <span
        onClick={() => handleShowModal(provinces, `province`, "Toàn quốc")}
        className="flex-1 cursor-pointer"
      >
        <SearchItem
          text="Toàn quốc"
          IconAfter={<BsChevronRight color="#9CA3AF" />}
          IconBefore={<GrLocation />}
          bold={true}
          filterText={filterText.province}
        />
      </span>
      <span
        onClick={() => handleShowModal(prices, `price`, "Chọn giá")}
        className="flex-1 cursor-pointer"
      >
        <SearchItem
          text="Chọn giá"
          IconAfter={<BsChevronRight color="#9CA3AF" />}
          IconBefore={<TbReportMoney />}
          filterText={filterText.price}
        />
      </span>

      <span
        onClick={() => handleShowModal(areas, `area`, "Chọn diện tích")}
        className="flex-1 cursor-pointer"
      >
        <SearchItem
          text="Chọn diện tích"
          IconAfter={<BsChevronRight color="#9CA3AF" />}
          IconBefore={<RiCrop2Line />}
          filterText={filterText.area}
        />
      </span>

      <button
        type="button"
        className="outline-none py-2 px-4 flex-1 border bg-primaryBlue text-sm flex items-center justify-center gap-2 text-white font-medium"
        onClick={handleSearch}
      >
        <CiSearch size={20} /> Tìm kiếm
      </button>
      {isShowModal && (
        <SearchModal
          content={content}
          setIsShowModal={setIsShowModal}
          name={name}
          setFilterText={setFilterText}
          setFilterQueries={setFilterQueries}
          queries={filterQueries}
          arrMinMax={arrMinMax}
          setArrMinMax={setArrMinMax}
          defaultText={defaultText}
        />
      )}
    </div>
  );
};

export default Search;
