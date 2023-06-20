import hcmImg from "../../assets/location_hcm.jpg";
import hnImg from "../../assets/location_hn.jpg";
import dnImg from "../../assets/location_dn.jpg";

export const categoryFeatured = {
  id: "TC",
  HOME_TITLE: "Kênh thông tin Phòng Trọ số 1 Việt Nam",
  HOME_DESCRIPTION:
    "Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.",
};

export const location = [
  {
    id: "hcm",
    name: `Phòng trọ Hồ Chí Minh`,
    image: hcmImg,
    provinceCode: "CA7KI",
  },
  { id: "hn", name: `Phòng trọ Hà Nội`, image: hnImg, provinceCode: "NK5TI" },
  { id: "dn", name: `Phòng trọ Đà Nẵng`, image: dnImg, provinceCode: "NC5EN" },
];

export const mapDetail = [
  "Bạn đang xem nội dung tin đăng: ",
  ". Mọi thông tin liên quan đến tin đăng này chỉ mang tính chất tham khảo. Nếu bạn có phản hồi với tin đăng này (báo xấu, tin đã cho thuê, không liên lạc được,...), vui lòng thông báo để PhòngTrọ123 có thể xử lý.",
];

export const attention = [
  "Nội dung phải viết bằng tiếng Việt có dấu",
  "Tiêu đề tin không dài quá 100 kí tự",
  "Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn.",
  "Để tăng độ tin cậy và tin rao được nhiều người quna tâm hơn, hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách kéo icon tới đúng vị trí của tin rao",
  "Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với tin rao không có ảnh. Hãy đăng ảnh để được giao dịch nhanh chóng",
];
