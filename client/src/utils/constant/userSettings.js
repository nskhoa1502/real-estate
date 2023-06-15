import icons from "../icon/icons";

const { TbPencilPlus, BsFilePost, FaUserCircle } = icons;

const userSettings = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "/dang-tin-moi",
    icon: <TbPencilPlus />,
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: "/quan-ly/quan-ly-bai-dang",
    icon: <BsFilePost />,
  },
  {
    id: 3,
    text: "Thông tin tài khoản",
    path: "/quan-ly/thong-tin-tai-khoan",
    icon: <FaUserCircle />,
  },
];

export default userSettings;
