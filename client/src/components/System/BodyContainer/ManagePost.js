import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostsAdmin } from "../../../redux/slices/postSlice";
import moment from "moment";
import "moment/locale/vi";
import { convertDate } from "../../../utils/helper-function/convert";

const ManagePost = () => {
  const { currentUserPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  console.log(currentUserPosts);

  useEffect(() => {
    dispatch(getPostsAdmin());
  }, [dispatch]);

  const checkStatus = (ddmmyyyy) => {
    let todayInSeconds = new Date().getTime();
    let expiredDateInSeconds = convertDate(ddmmyyyy);
    console.log(`today`, todayInSeconds);
    console.log(`expired`, expiredDateInSeconds);

    return todayInSeconds <= expiredDateInSeconds
      ? "Đang hoạt động"
      : "Đã hết hạn";
  };
  return (
    <div className="flex flex-col gap-6">
      <div className="border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium py-4">Quản lý tin đăng</h1>
        <select
          value=""
          className="outline-none border p-2 border-gray-200 rounded-md"
        >
          <option value="">Lọc theo trạng thái</option>
        </select>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border p-2">Mã tin</th>
            <th className="border p-2">Ảnh đại diện</th>
            <th className="border p-2">Tiêu đề</th>
            <th className="border p-2">Giá</th>
            <th className="border p-2">Ngày bắt đầu</th>
            <th className="border p-2">Ngày hết hạn</th>
            <th className="border p-2">Trạng thái</th>
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
                <tr key={item?.id}>
                  <td className="border p-2 text-center">
                    {item?.overviews?.code}
                  </td>
                  <td className="border p-2 flex items-center justify-center">
                    <img
                      src={JSON.parse(item?.images?.image)[0] || ""}
                      alt="avatar-post"
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="border p-2 text-center">{item?.title}</td>
                  <td className="border p-2 text-center">
                    {item?.attributes?.price}
                  </td>
                  <td className="border p-2 text-center">
                    {item?.overviews?.created}
                  </td>
                  <td className="border p-2 text-center">
                    {item?.overviews?.expired}
                  </td>
                  <td className="border p-2 text-center">
                    {" "}
                    {/* {moment(
                      item?.overviews?.expired?.split(" ")[3],
                      "DD/MM/YYYY"
                    )
                      .toDate()
                      .toString() || "ok"} */}
                    {checkStatus(item?.overviews?.expired?.split(" ")[3])}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePost;
