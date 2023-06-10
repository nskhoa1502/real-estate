import React, { memo } from "react";
import icons from "../../../utils/icon/icons";
import { formatContent } from "../../../utils/helper-function/convert";

const { GrNext } = icons;

const ItemSidebar = ({ title, content, isDouble }) => {
  // console.log(categories);

  const formattedContent = formatContent(content);
  console.log(content);
  console.log(formattedContent);
  return (
    <div className="p-4 rounded-md bg-white w-full mb-4">
      <h3 className="text-lg font-semibold mb-5">{title}</h3>
      {!isDouble && (
        <div className="flex flex-col gap-2">
          {content?.length > 0 &&
            content?.map((item) => (
              <div
                key={item.code}
                className="flex gap-1 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed"
              >
                <GrNext size={10} />
                <p>{item.value}</p>
              </div>
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
                <div className="flex flex-1 gap-1 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed">
                  <GrNext size={10} />
                  <p>{item.left.value}</p>
                </div>

                <div className="flex flex-1 gap-1 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed">
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
