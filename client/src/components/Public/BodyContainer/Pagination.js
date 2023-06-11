import React, { useEffect, useState } from "react";
import { PageNumber } from "../../../UI";
import icons from "../../../utils/icon/icons";
import { extractPageArr } from "../../../utils/helper-function/extractPageNumber";

const { AiOutlineDoubleRight } = icons;

const Pagination = ({ number, totalPage, postPerPage, count, category }) => {
  const [arrPage, setArrPage] = useState([]);

  useEffect(() => {
    const tempArr = extractPageArr(+number, +count, postPerPage);
    setArrPage(tempArr);
  }, [number, count, postPerPage]);

  return (
    <div className="flex items-center justify-center gap-2 py-5">
      {arrPage?.length > 0 &&
        arrPage?.map((pageNumber, index) => (
          <PageNumber
            key={index}
            number={pageNumber}
            currentPage={number}
            rangeStart={1}
            category={category}
          />
        ))}

      {+number + 3 < totalPage ? (
        <PageNumber
          number={<AiOutlineDoubleRight size={16} />}
          type="end"
          endpage={totalPage}
          category={category}
        />
      ) : null}
    </div>
  );
};

export default Pagination;
