import React from "react";
import { text } from "../../../utils/constant/data.contact";
import { Button } from "../../../UI";

const Contact = () => {
  return (
    <div className="bg-white rounded-md shadow-md p-4 w-100% flex flex-col justify-center items-center gap-6">
      <img
        src={text.image}
        alt="Support"
        className="w-full h-48 object-contain"
      />
      <p>{text.content}</p>
      <div className="flex items-center justify-around w-full">
        {text.contacts.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <span className="text-orange-700 font-bold">{item.text}</span>
              <span className="text-blue-700 text-xl font-bold">
                {item.phone}
              </span>
              <span className="text-blue-700 text-xl font-bold">
                {" "}
                {item.zalo}
              </span>
            </div>
          );
        })}
      </div>
      <Button
        text="Gửi liên hệ"
        bgColor={`bg-primaryBlue`}
        textColor={`text-white`}
        px="px-6"
      />
    </div>
  );
};

export default Contact;
