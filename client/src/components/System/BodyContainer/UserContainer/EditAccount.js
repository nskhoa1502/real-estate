import React, { useState } from "react";
import InputReadOnly from "../InputReadOnly";
import InputForm from "../InputForm";
import anon_avatar from "../../../../assets/anon_avatar.png";
import { Button } from "../../../../UI";
import { useDispatch, useSelector } from "react-redux";
import { extractNumbersFromId } from "../../../../utils/helper-function/extractNumberId";
import Loading from "../../../../UI/Loading";
import { apiUpdateUser } from "../../../../redux/services/userService";
import Swal from "sweetalert2";
import {
  blobToBase64,
  fileToBase64,
} from "../../../../utils/helper-function/base64";
import { getCurrentUser } from "../../../../redux/slices/authSlice";

const EditAccount = () => {
  const { currentData } = useSelector((state) => state.auth);
  const [isLoading] = useState(false);
  //   console.log(currentData);
  const [payload, setPayload] = useState({
    name: currentData?.name || "",
    avatar: currentData?.avatar ? blobToBase64(currentData?.avatar) : "",
    fbUrl: currentData?.fbUrl || "",
    zalo: currentData?.zalo || "",
  });
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    try {
      console.log(payload);
      const response = await apiUpdateUser(payload);
      Swal.fire("Done", "Chỉnh sửa thông tin thành công", "success").then(
        () => {
          dispatch(getCurrentUser());
        }
      );
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Cập nhật thông tin thất bại!",
      });
      throw err;
    }
  };

  const handleUploadFile = async (e) => {
    const image = e?.target?.files[0];
    const imageBase64 = await fileToBase64(image);

    setPayload((prev) => ({ ...prev, avatar: imageBase64 }));
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
            flexDirection={`flex-row`}
            value={payload?.name}
            setValue={setPayload}
            field="name"
          />

          <InputForm
            label={"Zalo"}
            flexDirection={`flex-row`}
            value={payload?.zalo}
            setValue={setPayload}
            field="zalo"
          />
          <InputForm
            label={"Facebook"}
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
                  src={payload?.avatar || anon_avatar}
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
