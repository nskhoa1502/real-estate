import React, { useState } from "react";
import InputReadOnly from "../InputReadOnly";
import InputForm from "../InputForm";
import anon_avatar from "../../../../assets/anon_avatar.png";
import { Button } from "../../../../UI";
import { useSelector } from "react-redux";
import { extractNumbersFromId } from "../../../../utils/helper-function/extractNumberId";
import { apiUploadImages } from "../../../../redux/services/postService";
import Loading from "../../../../UI/Loading";

const EditAccount = () => {
  const [invalidFields, setInvalidFields] = useState([]);
  const { currentData } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  //   console.log(currentData);
  const [payload, setPayload] = useState({
    name: currentData?.name || "",
    avatar: currentData?.avatar ? currentData?.avatar : anon_avatar,
    fbUrl: currentData?.fbUrl || "",
    zalo: currentData?.zalo || "",
  });

  const handleSubmit = () => {
    console.log(payload);
  };

  const handleUploadFile = async (e) => {
    const image = e?.target?.files[0];
    e.stopPropagation();
    setIsLoading(true);

    try {
      let formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", process.env.REACT_APP_UPLOAD_ASSET_NAME);

      const response = await apiUploadImages(formData);
      //   console.log(response);
      setPayload((prev) => ({
        ...prev,
        avatar: response?.secure_url,
      }));
      setIsLoading(false);

      // console.log(images);
      //   setImagesPreview((prev) => [...prev, ...images]);

      //   setPayload((prev) => ({
      //     ...prev,
      //     images: [...payload?.images, ...images],
      //   }));
    } catch (err) {
      throw err;
    }
  };
  return (
    <div className="flex flex-col items-center h-full">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200 w-full text-start flex-none">
        Sửa thông tin cá nhân
      </h1>
      <div className="w-3/5 py-6 flex items-center justify-center flex-auto">
        <div className="w-full flex flex-col  gap-4 ">
          <InputReadOnly
            label={"Mã thành viên"}
            flexDirection={`flex-row`}
            value={`#${extractNumbersFromId(currentData?.id)}` || ""}
          />
          <InputReadOnly
            label={"Số điện thoại"}
            flexDirection={`flex-row `}
            editPhone
            value={currentData?.phone || ""}
            setValue={setPayload}
          />
          <InputForm
            label={"Tên hiển thị"}
            setInvalidFields={setInvalidFields}
            flexDirection={`flex-row`}
            value={payload?.name}
            setValue={setPayload}
            field="name"
          />

          <InputForm
            label={"Zalo"}
            setInvalidFields={setInvalidFields}
            flexDirection={`flex-row`}
            value={payload?.zalo}
            setValue={setPayload}
            field="zalo"
          />
          <InputForm
            label={"Facebook"}
            setInvalidFields={setInvalidFields}
            flexDirection={`flex-row`}
            value={payload?.fbUrl}
            setValue={setPayload}
            field="fbUrl"
          />
          <div className="flex items-center w-full gap-2 mb-6">
            <label htmlFor="password" className="w-[200px] flex-none">
              Mật khẩu
            </label>
            <small className="flex-auto text-blue-500 cursor-pointer ">
              Đổi mật khẩu
            </small>
          </div>
          <div className="flex items-center w-full gap-2 mb-6">
            <label className="w-[200px] flex-none" htmlFor="avatar">
              Ảnh đại diện
            </label>
            <div>
              {isLoading && <Loading />}
              {!isLoading && (
                <img
                  src={payload?.avatar}
                  className="w-24 h-24 rounded-full object-cover"
                  alt="avatar"
                />
              )}
              <input
                onChange={handleUploadFile}
                type="file"
                id="avatar"
                className="my-4"
              />
            </div>
          </div>
          <Button
            text="Cập nhật"
            bgColor={"bg-primaryBlue"}
            textColor={`text-white`}
            fullWidth
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
