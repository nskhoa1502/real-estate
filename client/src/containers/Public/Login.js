import React, { useEffect, useState } from "react";
import { InputForm, Button } from "../../UI";
import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(location.state?.register);

  useEffect(() => {
    setIsRegister(location.state?.register);
  }, [location.state?.register]);
  return (
    <div className="bg-red-500 w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm">
      <h3 className="font-semibold text-2xl mb-3">
        {isRegister ? "Đăng kí" : "Đăng nhập"}
      </h3>

      <div className="w-full flex flex-col gap-5">
        {isRegister && <InputForm label={`HỌ TÊN`} />}
        <InputForm label={`SỐ ĐIỆN THOẠI`} />
        <InputForm label={`MẬT KHẨU`} />
        <Button
          text={isRegister ? "Đăng kí" : "Đăng nhập"}
          bgColor="bg-primaryBlue"
          textColor="text-white"
          fullWidth
        />
      </div>
      <div className="mt-7 flex items-center justify-between">
        {isRegister ? (
          <small>
            Bạn đã có tài khoản?{" "}
            <span
              onClick={() => setIsRegister(false)}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Đăng nhập ngay
            </span>
          </small>
        ) : (
          <>
            {" "}
            <small className="text-[blue] hover:text-[red] cursor-pointer">
              Bạn quên mật khẩu
            </small>
            <small
              className="text-[blue] hover:text-[red] cursor-pointer"
              onClick={() => setIsRegister(true)}
            >
              Tạo tài khoản mới
            </small>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
