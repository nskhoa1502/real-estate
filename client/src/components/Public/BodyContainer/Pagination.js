import React from "react";
import { PageNumber } from "../../../UI";
import { useSelector } from "react-redux";
import { convertPageNumbertoArr } from "../../../utils/helper-function/convert";
import icons from "../../../utils/icon/icons";

const { AiOutlineDoubleRight } = icons;

const Pagination = ({ number }) => {
  const { count, posts } = useSelector((state) => state.post);

  const pageNumberArr = convertPageNumbertoArr(count, posts?.length);
  console.log(pageNumberArr);
  return (
    <div className="flex items-center justify-center gap-2 py-5">
      {pageNumberArr?.length > 0 &&
        pageNumberArr?.map((pageNumber) => (
          <PageNumber
            key={pageNumber}
            number={pageNumber}
            currentPage={number}
          />
        ))}

      <PageNumber number={"..."} />
      <PageNumber number={<AiOutlineDoubleRight size={16} />} />
    </div>
  );
};

export default Pagination;
