import React, { memo } from "react";
import icons from "../../../utils/icon/icons";
import { formatContent } from "../../../utils/helper-function/convert";
import { formatVietnameseText } from "../../../utils/helper-function/convert";
import {
  Link,
  useNavigate,
  useLocation,
  createSearchParams,
} from "react-router-dom";

const { GrNext } = icons;

const ItemSidebar = ({ title, content, isDouble, type, category }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleFilterPosts = (code) => {
    const params = { page: 1, [type]: code };
    if (category?.code) {
      params.categoryCode = category.code;
    }

    navigate({
      pathname: location.pathname,
      search: createSearchParams(params).toString(),
    });
  };

  return (
    <div className="p-4 rounded-md bg-white w-full mb-4">
      <h3 className="text-lg font-semibold mb-5">{title}</h3>
      {!isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            content?.map((item) => (
              <Link
                to={`${formatVietnameseText(item.value)}`}
                key={item.code}
                className="flex gap-1 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed"
              >
                <GrNext size={10} />
                <p>{item.value}</p>
              </Link>
            ))}
        </div>
      )}
      {isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            formatContent(content)?.map((item, index) => (
              <div
                key={index}
                className="flex gap-2 items-center justify-between"
              >
                <div
                  onClick={() => handleFilterPosts(item.left.code)}
                  className="flex flex-1 gap-1 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed"
                >
                  <GrNext size={10} />
                  <p>{item.left.value}</p>
                </div>

                <div
                  onClick={() => handleFilterPosts(item.right.code)}
                  className="flex flex-1 gap-1 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed"
                >
                  <GrNext size={10} />
                  <p>{item.right.value}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default memo(ItemSidebar);
