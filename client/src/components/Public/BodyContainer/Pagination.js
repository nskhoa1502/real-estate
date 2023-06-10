import React, { useEffect, useState } from "react";
import { PageNumber } from "../../../UI";
import { useSelector } from "react-redux";
import icons from "../../../utils/icon/icons";
import { extractPageArr } from "../../../utils/helper-function/extractPageNumber";
import { createSearchParams, useNavigate } from "react-router-dom";

const { AiOutlineDoubleRight } = icons;

const Pagination = ({ number }) => {
  const { count, posts } = useSelector((state) => state.post);
  const [arrPage, setArrPage] = useState([]);
  const navigate = useNavigate();

  const postPerPage = +posts?.length || 5;
  const maxPage = Math.ceil(+count / postPerPage);

  useEffect(() => {
    const tempArr = extractPageArr(+number, +count, +posts?.length);
    setArrPage(tempArr);
  }, [number, count, posts]);

  const handleChangePage = () => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        page: number,
      }).toString(),
    });
  };

  return (
    <div className="flex items-center justify-center gap-2 py-5">
      {arrPage?.length > 0 &&
        arrPage?.map((pageNumber, index) => (
          <PageNumber
            key={index}
            number={pageNumber}
            currentPage={number}
            rangeStart={1}
          />
        ))}

      {+number + 3 < maxPage ? (
        <PageNumber
          number={<AiOutlineDoubleRight size={16} />}
          type="end"
          endpage={maxPage}
        />
      ) : null}
    </div>
  );
};

export default Pagination;
