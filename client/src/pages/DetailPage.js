import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetPostDetail } from "../redux/services/postService";
import ImageSlider from "../UI/ImageSlider";
import icons from "../utils/icon/icons";
import { Map, BoxInfo, RelatedPost } from "../components/Public";
import { mapDetail } from "../utils/constant/constant";
const { HiLocationMarker, RiCrop2Line, TbReportMoney, BsStopwatch, RiHashtag } =
  icons;

const DetailPage = () => {
  const { postId } = useParams();
  const [detailPost, setDetailPost] = useState(null);
  // console.log(postId);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await apiGetPostDetail(postId);
        setDetailPost(response.data.response);
        // console.log(response.data.response);
      } catch (err) {
        throw err;
      }
    };
    fetchDetail();
  }, [postId]);

  // console.log(Object.values(detailPost?.user)?.some((item) => item !== null));

  return (
    <div className="w-full flex gap-4 my-10 ">
      <div className="w-[70%] shadow-md rounded-md ">
        <ImageSlider
          images={detailPost && JSON.parse(detailPost?.images?.image)}
        />
        <div className="flex flex-col gap-2 bg-white px-6 py-4">
          <h2 className="text-red-600 font-bold text-2xl ">
            {detailPost?.title}
          </h2>
          <div className="flex gap-2">
            <span>Chuyên mục:</span>
            <span className="text-blue-600 underline font-medium cursor-pointer hover:text-orange-600">
              {detailPost?.overviews?.area}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <HiLocationMarker color="#2563eb" />
            <span>{detailPost?.address}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <TbReportMoney />
              <span className="font-bold text-lg text-green-600">
                {detailPost?.attributes?.price}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <RiCrop2Line />
              <span className="">{detailPost?.attributes?.acreage}</span>
            </div>
            <div className="flex items-center gap-1">
              <BsStopwatch />
              <span className="">{detailPost?.attributes?.published}</span>
            </div>
            <div className="flex items-center gap-1">
              <RiHashtag />
              <span className="">{detailPost?.attributes?.hashtag}</span>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xl">Thông tin mô tả</h3>
            <div className="flex flex-col gap-2 py-2">
              {/* {detailPost?.description &&
                JSON.parse(detailPost?.description)?.map((item, index) => {
                  return <span key={index}>{item}</span>;
                })} */}
              {detailPost?.description && JSON.parse(detailPost?.description)}
            </div>
          </div>
          <div className="mt-5">
            <h3 className="font-semibold text-xl">Đặc điểm tin đăng</h3>
            <table className="w-full">
              <tbody>
                <tr className="w-full">
                  <td className="p-4 w-[50%]">Mã tin</td>
                  <td className="p-4 w-[50%]">{detailPost?.overviews?.code}</td>
                </tr>
                <tr className="w-full bg-gray-100">
                  <td className="p-4 w-[50%]">Khu vực</td>
                  <td className="p-4 w-[50%]">{detailPost?.overviews?.area}</td>
                </tr>
                <tr className="w-full">
                  <td className="p-4 w-[50%]">Loại tin rao</td>
                  <td className="p-4 w-[50%]">{detailPost?.overviews?.type}</td>
                </tr>
                <tr className="w-full bg-gray-100">
                  <td className="p-4 w-[50%]">Đối tượng</td>
                  <td className="p-4 w-[50%]">
                    {detailPost?.overviews?.target}
                  </td>
                </tr>
                <tr className="w-full">
                  <td className="p-4 w-[50%]">Gói tin</td>
                  <td className="p-4 w-[50%]">
                    {detailPost?.overviews?.bonus}
                  </td>
                </tr>
                <tr className="w-full bg-gray-100">
                  <td className="p-4 w-[50%]">Ngày đăng</td>
                  <td className="p-4 w-[50%]">
                    {detailPost?.overviews?.created}
                  </td>
                </tr>
                <tr className="w-full">
                  <td className="p-4 w-[50%]">Ngày hêt hạn</td>
                  <td className="p-4 w-[50%]">
                    {detailPost?.overviews?.expired}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {detailPost &&
            Object.values(detailPost?.user)?.some((item) => item !== null) && (
              <div className="mt-5">
                <h3 className="font-semibold text-xl">Thông tin liên hệ</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="w-full">
                      <td className="p-4 w-[50%]">Liên hệ</td>
                      <td className="p-4 w-[50%]">{detailPost?.user?.name}</td>
                    </tr>
                    <tr className="w-full bg-gray-100">
                      <td className="p-4 w-[50%] ">Điện thoại</td>
                      <td className="p-4 w-[50%] ">
                        {detailPost?.user?.phone}
                      </td>
                    </tr>
                    <tr className="w-full">
                      <td className="p-4 w-[50%]">Zalo</td>
                      <td className="p-4 w-[50%]">{detailPost?.user?.zalo}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          <div className="mt-5">
            <h3 className="font-semibold text-xl">Bản đồ</h3>
            <Map address={detailPost?.address} />
            <span className="text-gray-500 text-sm py-4 text-justify">
              {mapDetail[0]}
            </span>
            <span className="text-gray-500 text-sm py-4 text-justify italic">{`"${detailPost?.address} - Mã tin: #${detailPost?.attributes?.hashtag}"`}</span>
            <span className="text-gray-500 text-sm py-4 text-justify">
              {mapDetail[1]}
            </span>
          </div>
        </div>
      </div>
      <div className="w-[30%] flex flex-col gap-5">
        <BoxInfo userData={detailPost?.user} />
        <RelatedPost />
        <RelatedPost newPost />
      </div>
    </div>
  );
};

export default DetailPage;
