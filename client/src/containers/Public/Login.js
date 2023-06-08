import React, { useEffect, useState } from "react";
import { InputForm, Button } from "../../UI";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { login, register } from "../../slices/authSlice";

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(location.state?.register);
  const { error, message } = useSelector((state) => state.auth);
  // console.log(error);

  const [payload, setPayload] = useState({
    phone: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    setIsRegister(location.state?.register);
  }, [location.state?.register]);

  const handleSubmit = () => {
    const { phone, password, name } = payload;

    if (isRegister) {
      dispatch(register({ phone, password, name }));
    } else {
      dispatch(login({ phone, password }));
    }
  };
  return (
    <div className="bg-white w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm mt-5">
      <h3 className="font-semibold text-2xl mb-3">
        {isRegister ? "Đăng kí" : "Đăng nhập"}
      </h3>

      <div className="w-full flex flex-col gap-5">
        {isRegister && (
          <InputForm
            label={`HỌ TÊN`}
            value={payload.name}
            setValue={setPayload}
            id="name"
          />
        )}
        <InputForm
          label={`SỐ ĐIỆN THOẠI`}
          value={payload.phone}
          setValue={setPayload}
          id="phone"
        />
        <InputForm
          label={`MẬT KHẨU`}
          value={payload.password}
          setValue={setPayload}
          id="password"
        />
        <Button
          text={isRegister ? "Đăng kí" : "Đăng nhập"}
          bgColor="bg-primaryBlue"
          textColor="text-white"
          fullWidth
          onClick={handleSubmit}
        />
        {error && <div className="text-md text-red-500">{error.message}</div>}
        {message && <div className="text-md text-green-500">{message}</div>}
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
