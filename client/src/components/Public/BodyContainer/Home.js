import React from "react";
import Province from "../HeaderContainer/Province";
import { categoryFeatured } from "../../../utils/constant/constant";
import List from "./List";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const { id, HOME_TITLE, HOME_DESCRIPTION } = categoryFeatured[0];
  const [params] = useSearchParams();
  const pageNumber = params.get("page") || 1;

  return (
    <div className="my-3 w-full flex flex-col gap-5">
      <Province id={id} title={HOME_TITLE} description={HOME_DESCRIPTION} />
      <div className="w-full flex gap-3">
        <div className="w-[70%]">
          <List />
          <Pagination key={pageNumber} number={pageNumber} />
          <div className="h-[500px]"></div>
        </div>
        <div className="w-[30%] border border-green-600">Sidebar</div>
      </div>
    </div>
  );
};

export default Home;
