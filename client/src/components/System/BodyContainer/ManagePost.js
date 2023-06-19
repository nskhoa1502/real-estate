import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsAdmin, setEditPost } from "../../../redux/slices/postSlice";

import {
  convertDate,
  truncateString,
} from "../../../utils/helper-function/convert";
import Button from "../../../UI/Button";
import UpdatePost from "./UpdatePost";

const ManagePost = () => {
  const { currentUserPosts, editPost } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  // const [postEdit, setPostEdit] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  // console.log(currentUserPosts);

  useEffect(() => {
    dispatch(getPostsAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(editPost).length === 0) {
      setIsEdit(false);
    }
  }, [editPost]);

  const checkStatus = (ddmmyyyy) => {
    let todayInSeconds = new Date().getTime();
    let expiredDateInSeconds = convertDate(ddmmyyyy);
    // console.log(`today`, todayInSeconds);
    // console.log(`expired`, expiredDateInSeconds);

    return todayInSeconds <= expiredDateInSeconds
      ? "Đang hoạt động"
      : "Đã hết hạn";
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium py-4">Quản lý tin đăng</h1>
        <select
          value="Lọc theo trạng thái"
          className="outline-none border p-2 border-gray-200 rounded-md"
          readOnly
          // defaultValue={`Lọc theo trạng thái`}
        >
          <option value="">Lọc theo trạng thái</option>
        </select>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="flex w-full bg-gray-300 ">
            <th className="border flex-1 p-2">Mã tin</th>
            <th className="border flex-1 p-2">Ảnh đại diện</th>
            <th className="border flex-1 p-2">Tiêu đề</th>
            <th className="border flex-1 p-2">Giá</th>
            <th className="border flex-1 p-2">Ngày bắt đầu</th>
            <th className="border flex-1 p-2">Ngày hết hạn</th>
            <th className="border flex-1 p-2">Trạng thái</th>
            <th className="border flex-1 p-2">Tùy chọn</th>
          </tr>
        </thead>
        <tbody>
          {currentUserPosts?.length === 0 && (
            <tr>
              <td
                className="border p-2 text-center text-lg text-red-500"
                colSpan={7}
              >
                Không có dữ liệu
              </td>
            </tr>
          )}

          {currentUserPosts?.length > 0 &&
            currentUserPosts?.map((item) => {
              return (
                <tr className="flex h-16" key={item?.id}>
                  <td className="border flex-1 h p-2 flex items-center justify-center">
                    {item?.overviews?.code}
                  </td>
                  <td className="border p-2 flex-1 flex justify-center items-center">
                    <img
                      src={JSON.parse(item?.images?.image)[0] || ""}
                      alt="avatar-post"
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="border flex-1 h p-2 flex items-center justify-start ">
                    {truncateString(item?.title, 40)}
                  </td>
                  <td className="border flex-1 h p-2 flex items-center justify-center">
                    {item?.attributes?.price}
                  </td>
                  <td className="border flex-1 h p-2 flex items-center justify-center">
                    {item?.overviews?.created}
                  </td>
                  <td className="border flex-1 h p-2 flex items-center justify-center">
                    {item?.overviews?.expired}
                  </td>
                  <td className="border flex-1 h p-2 flex items-center justify-center">
                    {" "}
                    {/* {moment(
                      item?.overviews?.expired?.split(" ")[3],
                      "DD/MM/YYYY"
                    )
                      .toDate()
                      .toString() || "ok"} */}
                    {checkStatus(item?.overviews?.expired?.split(" ")[3])}
                  </td>
                  <td className="border flex-1 h p-2 text-center flex items-center gap-3 justify-center h-full">
                    <Button
                      text="Sửa"
                      bgColor={`bg-primaryBlue`}
                      textColor={`text-white`}
                      fullWidth={true}
                      onClick={() => {
                        dispatch(setEditPost(item));
                        setIsEdit(true);
                      }}
                    />
                    <Button
                      text="Xóa"
                      bgColor={`bg-primaryRed`}
                      textColor={`text-white`}
                      fullWidth={true}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  );
};

export default ManagePost;
