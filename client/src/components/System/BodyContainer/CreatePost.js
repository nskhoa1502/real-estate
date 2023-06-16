import React, { useState } from "react";
import Overview from "./Overview";
import Address from "./Address";
import icons from "../../../utils/icon/icons";
import { apiUploadImages } from "../../../redux/services/postService";
import Loading from "../../../UI/Loading";
import Button from "../../../UI/Button";
import {
  generatePayloadCode,
  getCode,
} from "../../../utils/helper-function/getCode";
import { useSelector } from "react-redux";

const { BsCameraFill, RiDeleteBin5Line, RiDeleteBack2Line } = icons;

const CreatePost = () => {
  const [payload, setPayload] = useState({
    categoryCode: "",
    areaCode: "",
    priceCode: "",
    priceNumber: 0,
    areaNumber: 0,
    images: "",
    address: "",

    description: "",
    target: "",
    province: "",
  });
  const { prices, areas } = useSelector((state) => state.app);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleFiles = async (e) => {
    e.stopPropagation();
    setIsLoading(true);

    try {
      let files = e?.target?.files;
      let images = [];
      let formData = new FormData();
      for (let file of files) {
        formData.append("file", file);
        formData.append(
          "upload_preset",
          process.env.REACT_APP_UPLOAD_ASSET_NAME
        );

        const response = await apiUploadImages(formData);

        images = [...images, response.secure_url];
      }
      console.log(images);
      setImagesPreview((prev) => [...prev, ...images]);
      setIsLoading(false);
      setPayload((prev) => ({
        ...prev,
        images: [...payload?.images, ...images],
      }));
    } catch (err) {
      throw err;
    }
  };

  const handleDelete = (image) => {
    setImagesPreview((prev) => prev?.filter((item) => item !== image));
    setPayload((prev) => ({
      ...prev,
      images: prev?.images?.filter((item) => item !== image),
    }));
  };

  const handleSubmit = () => {
    let priceCode = generatePayloadCode(+payload?.priceNumber, prices, "price");
    let areaCode = generatePayloadCode(+payload?.areaNumber, areas, "area");

    const submitData = {
      ...payload,
      images: JSON.stringify(payload?.images),
      priceCode,
      areaCode,
      priceNumber: +(+payload?.priceNumber / 1000000).toFixed(1),
      areaNumber: +payload?.areaNumber,
    };

    console.log(submitData);
  };
  return (
    <div className="px-6">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        Đăng tin mới
      </h1>
      <div className="flex gap-4">
        <div className="py-4 flex flex-col gap-8 flex-auto">
          <Address payload={payload} setPayload={setPayload} />
          <Overview payload={payload} setPayload={setPayload} />
          <div className="w-full">
            <h2 className="font-medium text-xl py-4">Hình ảnh</h2>
            <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            <div className="w-full mb-2">
              <label
                htmlFor="file"
                className="w-full border-2 flex flex-col border-dashed border-gray-400 h-[300px] rounded-md items-center justify-center my-4 gap-4"
              >
                {isLoading && <Loading />}
                {!isLoading && (
                  <div>
                    {" "}
                    <BsCameraFill size={60} color="blue" />
                    Thêm ảnh
                  </div>
                )}
              </label>
              <input
                hidden
                type="file"
                id="file"
                multiple
                onChange={handleFiles}
              />
              <div>
                <h3 className="font-medium">Ảnh đã chọn</h3>
                <div className="flex gap-3 w-full py-4">
                  {imagesPreview?.map((image) => {
                    return (
                      <div key={image} className="relative w-20 h-20">
                        <img
                          src={image}
                          alt="preview"
                          className=" w-full h-full object-cover rounded-md"
                        />
                        <span
                          onClick={() => handleDelete(image)}
                          title="Xóa"
                          className="absolute top-0 right-0 p-1 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
                        >
                          <RiDeleteBack2Line color="red" />
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <Button
              text="Tạo mới"
              bgColor={"bg-primaryBlue"}
              textColor={"text-white"}
              fullWidth={true}
              onClick={handleSubmit}
            />
          </div>
        </div>
        <div className="w-[30%] flex-none">Bản đồ</div>
      </div>
      <div className="h-[500px]"></div>
    </div>
  );
};

export default CreatePost;
