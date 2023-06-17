import icons from "../icon/icons";

const { TbPencilPlus, BsFilePost, FaUserCircle } = icons;

const userSidebar = [
  {
    id: 1,
    text: "Đăng tin",
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
    text: "Sửa thông tin cá nhân",
    path: "/quan-ly/sua-thong-tin-ca-nhan",
    icon: <FaUserCircle />,
  },
  {
    id: 4,
    text: "Liên hệ",
    path: "/quan-ly/lien-he",
    icon: <FaUserCircle />,
  },
];

export default userSidebar;
