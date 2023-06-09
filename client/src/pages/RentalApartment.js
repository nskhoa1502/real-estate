import React from "react";
import { categoryFeatured } from "../utils/constant/constant";
import { Province } from "../components/Public";

const RentalApartment = () => {
  const { id, HOME_TITLE, HOME_DESCRIPTION } = categoryFeatured[1];
  return (
    <div className="my-3 w-full border border-red-500 flex flex-col gap-3">
      <Province id={id} title={HOME_TITLE} description={HOME_DESCRIPTION} />
    </div>
  );
};

export default RentalApartment;
