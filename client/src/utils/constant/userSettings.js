import icons from "../icon/icons";

const { TbPencilPlus, BsFilePost, FaUserCircle } = icons;

const userSettings = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "/quan-ly/dang-tin-moi",
    icon: <TbPencilPlus />,
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: "/quan-ly/quan-ly-tin-dang",
    icon: <BsFilePost />,
  },
  {
    id: 3,
    text: "Thông tin tài khoản",
    path: "/quan-ly/sua-thong-tin-ca-nhan",
    icon: <FaUserCircle />,
  },
];

export default userSettings;
