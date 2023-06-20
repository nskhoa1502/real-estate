import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import anon_avatar from "../../../assets/anon_avatar.png";
import { extractNumbersFromId } from "../../../utils/helper-function/extractNumberId";
import { blobToBase64 } from "../../../utils/helper-function/base64";

const CurrentUser = () => {
  const { currentData } = useSelector((state) => state.auth);
  const [avatarBase64, setAvatarBase64] = useState("");

  useEffect(() => {
    if (currentData?.avatar) {
      const convertAvatarToBase64 = async () => {
        const base64 = await blobToBase64(currentData.avatar);
        setAvatarBase64(base64);
      };
      convertAvatarToBase64();
    }
  }, [currentData?.avatar]);

  return (
    <>
      {currentData && Object.keys(currentData).length > 0 && (
        <div className="flex items-center gap-2">
          <img
            src={avatarBase64 || anon_avatar}
            alt="avatar"
            className="w-10 object-cover rounded-full h-10  border-white border-2 shadow-md"
          />
          <div className="flex flex-col">
            <span>
              Xin chào,{" "}
              <span className="font-semibold">{currentData?.name}</span>
            </span>
            <span>
              Mã tài khoản:{" "}
              <span className="font-semibold  w-20 ">
                {extractNumbersFromId(currentData?.id)}
              </span>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentUser;
