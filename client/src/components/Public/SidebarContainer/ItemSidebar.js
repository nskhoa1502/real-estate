import React, { memo } from "react";
import icons from "../../../utils/icon/icons";

const { GrNext } = icons;

const ItemSidebar = ({ title, content }) => {
  // console.log(categories);
  return (
    <div className="p-4 rounded-md bg-white w-full mb-4">
      <h3 className="text-lg font-semibold mb-5">{title}</h3>
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
    </div>
  );
};

export default memo(ItemSidebar);