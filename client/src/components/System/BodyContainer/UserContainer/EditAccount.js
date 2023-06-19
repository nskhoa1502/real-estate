import React, { useState } from "react";
import InputReadOnly from "../InputReadOnly";
import InputForm from "../InputForm";
import anon_avatar from "../../../../assets/anon_avatar.png";
import { Button } from "../../../../UI";

const EditAccount = () => {
  const [invalidFields, setInvalidFields] = useState([]);
  return (
    <div className="flex flex-col items-center h-full">
      <h1 className="text-3xl font-medium py-4 border-b border-gray-200 w-full text-start flex-none">
        Sửa thông tin cá nhân
      </h1>
      <div className="w-3/5 py-6 flex items-center justify-center flex-auto">
        <div className="w-full flex flex-col  gap-4 ">
          <InputReadOnly label={"Mã thành viên"} flexDirection={`flex-row`} />
          <InputReadOnly
            label={"Số điện thoại"}
            flexDirection={`flex-row `}
            editPhone
          />
          <InputForm
            label={"Tên hiển thị"}
            setInvalidFields={setInvalidFields}
            flexDirection={`flex-row`}
          />
          <InputForm
            label={"Email"}
            setInvalidFields={setInvalidFields}
            flexDirection={`flex-row`}
          />
          <InputForm
            label={"Zalo"}
            setInvalidFields={setInvalidFields}
            flexDirection={`flex-row`}
          />
          <InputForm
            label={"Facebook"}
            setInvalidFields={setInvalidFields}
            flexDirection={`flex-row`}
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
            <label className="w-[200px] flex-none">Ảnh đại diện</label>
            <img
              src={anon_avatar}
              className="w-24 h-24 rounded-full object-cover"
              alt="avatar"
            />
          </div>
          <Button
            text="Cập nhật"
            bgColor={"bg-primaryBlue"}
            textColor={`text-white`}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
