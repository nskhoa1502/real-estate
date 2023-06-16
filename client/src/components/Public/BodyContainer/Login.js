import React, { useEffect, useState } from "react";
import { Button } from "../../../UI";
import InputForm from "./InputForm";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { login, register, resetPopup } from "../../../redux/slices/authSlice";
import Swal from "sweetalert2";

const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isRegister, setIsRegister] = useState(location.state?.register);
  const [invalidFields, setInvalidFields] = useState([]);
  const { isLoggedIn, message, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    phone: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    setIsRegister(location.state?.register);
  }, [location.state?.register]);

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    error &&
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
        onClose: dispatch(resetPopup()),
      });

    message &&
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: message,
        showConfirmButton: true,
        timer: 2000,
        onClose: dispatch(resetPopup()),
      });
  }, [error, message, dispatch]);

  const handleSubmit = () => {
    const { phone, password, name } = payload;

    let invalidCount;

    if (isRegister) {
      invalidCount = validateRegistrationFields({ phone, password, name });
    } else {
      invalidCount = validateLoginFields({ phone, password });
    }
    // console.log(invalidCount);
    if (invalidCount === 0) {
      if (isRegister) {
        dispatch(register({ phone, password, name }));
      } else {
        dispatch(login({ phone, password }));
      }
    }
  };

  const validateLoginFields = ({ phone, password }) => {
    const fieldsToValidate = { phone, password };
    return validateFields(fieldsToValidate);
  };

  const validateRegistrationFields = ({ phone, password, name }) => {
    const fieldsToValidate = { phone, password, name };
    return validateFields(fieldsToValidate);
  };

  const validateFields = (fieldsToValidate) => {
    let invalidCount = 0;
    let fields = Object.entries(fieldsToValidate);
    let newInvalidFields = [];

    for (let field of fields) {
      if (field[1].trim() === "") {
        newInvalidFields.push({
          name: field[0],
          message: `Bạn không được bỏ trống trường này`,
        });
        invalidCount++;
      }

      if (field[0] === "password" && field[1].length < 6) {
        newInvalidFields.push({
          name: field[0],
          message: "Mật khẩu phải có tối thiểu 6 ký tự",
        });
        invalidCount++;
      }

      if (field[0] === "phone" && isNaN(+field[1])) {
        newInvalidFields.push({
          name: field[0],
          message: "Số điện thoại không hợp lệ",
        });
        invalidCount++;
      }
    }

    setInvalidFields(newInvalidFields);
    return invalidCount;
  };

  return (
    <div className="bg-white mb-10 w-[600px] p-[30px] pb-[100px] rounded-md shadow-sm mt-5 self-center	">
      <h3 className="font-semibold text-2xl mb-3">
        {isRegister ? "Đăng kí" : "Đăng nhập"}
      </h3>

      <div className="w-full flex flex-col gap-5">
        {isRegister && (
          <>
            <InputForm
              label={`HỌ TÊN`}
              value={payload.name}
              setValue={setPayload}
              id="name"
              setInvalidFields={setInvalidFields}
              invalidFields={invalidFields}
            />
          </>
        )}

        <InputForm
          label={`SỐ ĐIỆN THOẠI`}
          value={payload.phone}
          setValue={setPayload}
          id="phone"
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
        />

        <InputForm
          label={`MẬT KHẨU`}
          value={payload.password}
          setValue={setPayload}
          id="password"
          setInvalidFields={setInvalidFields}
          invalidFields={invalidFields}
          isPassword={true}
        />

        <Button
          text={isRegister ? "Đăng kí" : "Đăng nhập"}
          bgColor="bg-primaryBlue"
          textColor="text-white"
          fullWidth
          onClick={handleSubmit}
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
