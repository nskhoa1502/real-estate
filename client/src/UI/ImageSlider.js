import React, { memo } from "react";
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const ImageSlider = ({ images }) => {
  // console.log(images);
  return (
    <div className="w-full  ">
      <Slider {...settings}>
        {images &&
          images?.length > 0 &&
          images?.map((item, i) => (
            <div
              className="bg-black flex justify-center items-center h-[320px] w-full"
              key={i}
            >
              <img
                src={item}
                alt="slider"
                className=" object-contain m-auto h-full"
              />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default memo(ImageSlider);
