import React, { useState } from "react";
import { InputForm } from "../../Public";
import { Button } from "../../../UI";
import Swal from "sweetalert2";

const ContactForm = () => {
  const [payload, setPayload] = useState({
    name: "",
    phone: "",
    content: "",
  });

  const handleSubmit = () => {
    // console.log(payload);
    Swal.fire(
      `Xin cảm ơn ${payload?.name ? payload?.name : ""}!`,
      "Phản hồi của bạn đã được chúng tôi ghi nhận",
      "success",
      () => {
        setPayload({
          name: "",
          phone: "",
          content: "",
        });
      }
    );
  };
  return (
    <div className="w-full mb-20">
      <h1 className="text-2xl font-semibold my-10">Liên hệ với chúng tôi</h1>
      <div className="flex gap-4">
        <div className="flex-1 flex flex-col gap-4 bg-red-500 rounded-3xl text-white p-4 bg-gradient-to-br from-blue-700 to-cyan-400 h-fit">
          <h4 className="font-medium">Thông tin liên hệ</h4>
          <span>
            Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa
            chọn PhongTro123.com
          </span>
          <span>Điện thoại: 0912xxxxxx</span>
          <span>Email: abc@gmail.com</span>
          <span>Zalo: 0912xxxxxxx</span>
          <span>Viber: 0912xxxxxx</span>
          <span>
            Địa chỉ: LE-4.07, Toà nhà Lexington Residence, Số 67 Mai Chí Thọ,
            Phường An Phú, Quận 2, Tp. Hồ Chí Minh.
          </span>
        </div>
        <div className="flex-1 bg-white p-4 ">
          <h4 className="font-md font-medium mb-4 text-lg">
            Liên hệ chúng tôi
          </h4>
          <div className="flex flex-col gap-4">
            <InputForm
              label={"HỌ VÀ TÊN CỦA BẠN"}
              value={payload?.name}
              setValue={setPayload}
              id="name"
            />

            <InputForm
              label={"SỐ ĐIỆN THOẠI"}
              value={payload?.phone}
              setValue={setPayload}
              id="phone"
            />

            <div className="flex flex-col gap-1">
              <label htmlFor="desc" className="text-xs">
                NỘI DUNG MÔ TẢ
              </label>
              <textarea
                id="desc"
                cols="30"
                rows="3"
                className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
                value={payload?.content}
                onChange={(e) =>
                  setPayload((prev) => ({ ...prev, content: e?.target?.value }))
                }
              />
            </div>
            <Button
              fullWidth
              text={"GỬI LIÊN HỆ"}
              bgColor={"bg-primaryBlue"}
              textColor={"text-white"}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
