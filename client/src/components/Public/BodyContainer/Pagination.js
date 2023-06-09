import React, { useEffect, useState } from "react";
import { PageNumber } from "../../../UI";
import { useSelector } from "react-redux";
import icons from "../../../utils/icon/icons";
import { extractPageArr } from "../../../utils/helper-function/pageNumber";

const { AiOutlineDoubleRight } = icons;

const Pagination = ({ number }) => {
  const { count, posts } = useSelector((state) => state.post);
  const [arrPage, setArrPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(number);

  useEffect(() => {
    const tempArr = extractPageArr(+currentPage, +count, +posts?.length);
    console.log(tempArr);
    setArrPage(tempArr);
  }, [number, count, posts, currentPage]);

  //   const pageNumberArr = convertPageNumbertoArr(+count, +posts?.length);
  //   console.log(pageNumberArr);
  return (
    <div className="flex items-center justify-center gap-2 py-5">
      {arrPage?.length > 0 &&
        arrPage?.map((pageNumber, index) => (
          <PageNumber key={index} number={pageNumber} currentPage={number} />
        ))}

      {+currentPage + 3 < 80 && (
        <PageNumber number={<AiOutlineDoubleRight size={16} type="end" />} />
      )}
    </div>
  );
};

export default Pagination;
