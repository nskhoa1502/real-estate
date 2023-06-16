import React, { useState } from "react";
import Overview from "./Overview";
import Address from "./Address";
import icons from "../../../utils/icon/icons";
import { apiUploadImages } from "../../../redux/services/postService";

const { BsCameraFill } = icons;

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
  const [imagesPreview, setImagesPreview] = useState([]);

  // console.log(payload);

  const handleFiles = async (e) => {
    e.stopPropagation();
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
      setImagesPreview(images);
      setPayload((prev) => ({ ...prev, images: JSON.stringify(images) }));
    } catch (err) {
      throw err;
    }
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
            <div className="w-full">
              <label
                htmlFor="file"
                className="w-full border-2 flex flex-col border-dashed border-gray-400 h-[300px] rounded-md items-center justify-center my-4 gap-4"
              >
                <BsCameraFill size={60} color="blue" />
                Thêm ảnh
              </label>
              <input
                hidden
                type="file"
                id="file"
                multiple
                onChange={handleFiles}
              />
              <div>
                <h3 className="font-medium">Preview</h3>
                <div className="flex gap-3 w-full">
                  {imagesPreview?.map((image) => {
                    return (
                      <img
                        key={image}
                        src={image}
                        alt="preview"
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[30%] flex-none">Bản đồ</div>
      </div>
      <div className="h-[500px]"></div>
    </div>
  );
};

export default CreatePost;
