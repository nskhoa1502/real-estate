import React from "react";
import Province from "./Province";
import { categoryFeatured } from "../../utils/constant/constant";

const Home = () => {
  const { id, HOME_TITLE, HOME_DESCRIPTION } = categoryFeatured[0];
  return (
    <div className="my-3 w-full border border-red-500 flex flex-col gap-3">
      <Province id={id} title={HOME_TITLE} description={HOME_DESCRIPTION} />
    </div>
  );
};

export default Home;
