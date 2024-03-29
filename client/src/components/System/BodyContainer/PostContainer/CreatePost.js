import React, { useEffect, useState } from "react";
import Overview from "./Overview";
import Address from "./Address";
import icons from "../../../../utils/icon/icons";
import {
  apiUploadImages,
  apiCreatePost,
  apiUpdatePost,
} from "../../../../redux/services/postService";
import Loading from "../../../../UI/Loading";
import Button from "../../../../UI/Button";
import { generatePayloadCode } from "../../../../utils/helper-function/getCode";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { validateFields } from "../../../../utils/helper-function/validateField";
import { setEditPost } from "../../../../redux/slices/postSlice";
import Map from "../../../Public/BodyContainer/Map";
import { attention } from "../../../../utils/constant/constant";

const { BsCameraFill, RiDeleteBack2Line } = icons;

const CreatePost = ({ isEdit, setIsEdit }) => {
  const { editPost } = useSelector((state) => state.post);

  const [payload, setPayload] = useState(() => {
    let formData = {
      categoryCode: "",

      priceNumber: 0,
      areaNumber: 0,
      images: "",
      address: "",
      title: "",
      description: "",
      target: "Tất cả",
      province: "",
    };

    if (isEdit) {
      formData = {
        categoryCode: editPost?.categoryCode || "",

        priceNumber: editPost?.priceNumber * 1000000 || 0,
        areaNumber: editPost?.areaNumber || 0,
        images: editPost?.images?.image
          ? JSON.parse(editPost?.images?.image)
          : "",
        address: editPost?.address || "",
        title: editPost?.title || "",
        description: editPost?.description
          ? JSON.parse(editPost?.description)
          : "",
        target: editPost?.overviews?.target || "Tất cả",
        province: "",
      };
    }
    return formData;
  });
  // console.log(payload);
  const { prices, areas, categories } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const { currentData } = useSelector((state) => state.auth);
  const [imagesPreview, setImagesPreview] = useState(
    editPost?.images?.image ? JSON.parse(editPost?.images?.image) : []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit) {
      editPost?.images?.image &&
        setImagesPreview(JSON.parse(editPost?.images?.image));
    } else {
      // dispatch(setEditPost({}));
      setImagesPreview([]);
    }
  }, [editPost, isEdit]);

  useEffect(() => {
    if (!isEdit) {
      dispatch(setEditPost({}));
    }
  }, [isEdit, dispatch]);

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
      // console.log(images);
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

  useEffect(() => {
    // console.log(invalidFields);
  }, [JSON.stringify(invalidFields)]);

  const handleSubmit = async () => {
    let priceCode = generatePayloadCode(+payload?.priceNumber, prices, "price");
    let areaCode = generatePayloadCode(+payload?.areaNumber, areas, "area");
    const districtAddress = payload?.address
      ?.split(",")
      [payload?.address?.split(",")?.length - 2]?.trim();
    const categoryName = categories?.find(
      (item) => item?.code === payload?.categoryCode
    )?.value;

    // console.log(`${categoryName} ${districtAddress}`);
    // console.log(payload?.address.split(","));
    const submitData = {
      ...payload,
      priceCode,
      areaCode,
      priceNumber: +(payload?.priceNumber / 1000000).toFixed(1),
      areaNumber: +payload?.areaNumber,
      userId: currentData?.id,
      target: payload.target || "Tất cả",
      label: `${categoryName} ${districtAddress}`,
      categoryName,
    };

    if (editPost) {
      submitData.postId = editPost?.id;
      submitData.attributesId = editPost?.attributesId;
      submitData.imagesId = editPost?.imagesId;
      submitData.overviewsId = editPost?.overviews?.id;
    }

    // console.log(submitData);
    const result = validateFields(payload, setInvalidFields);
    // console.log(submitData);
    // console.log(result);
    if (result === 0) {
      try {
        if (isEdit) {
          await apiUpdatePost(submitData);
          Swal.fire({
            icon: "success",
            title: "Cập nhật bài đăng thành công",
          });
          dispatch(setEditPost({}));
        } else {
          await apiCreatePost(submitData);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Tạo bài đăng thành công",
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/");
        }

        setPayload({
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
      } catch (err) {
        if (isEdit) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Cập nhật bài đăng thất bại!",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Tạo bài đăng thất bại!",
          });
        }
        throw err;
      }
    }
  };
  return (
    <div className="px-6">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200">
        {isEdit ? "Chỉnh sửa tin đăng" : "Đăng tin mới"}
      </h1>
      <div className="flex gap-4">
        <div className="py-4 flex flex-col gap-8 flex-auto">
          <Address
            invalidFields={invalidFields}
            payload={payload}
            setPayload={setPayload}
            setInvalidFields={setInvalidFields}
          />
          <Overview
            invalidFields={invalidFields}
            payload={payload}
            setPayload={setPayload}
            setInvalidFields={setInvalidFields}
          />
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
                <small className="text-red-500 block w-full text-center">
                  {invalidFields?.some((item) => item.name === "images") &&
                    invalidFields?.find((item) => item?.name === "images")
                      ?.message}
                </small>
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
              text={isEdit ? "Cập nhật" : "Tạo mới"}
              bgColor={"bg-primaryBlue"}
              textColor={"text-white"}
              fullWidth={true}
              onClick={handleSubmit}
            />
          </div>
        </div>
        <div className="w-[30%] flex-none mt-10">
          <Map address={payload?.address} />
          <div className="mt-5 bg-orange-100 text-orange-900 rounded-md p-4">
            <h4 className="mb-4 text-xl font-medium">Lưu ý tin đăng:</h4>
            <ul className="text-justify">
              {attention.map((item, index) => {
                return (
                  <li key={index} className="text-sm  list-disc list-inside">
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
