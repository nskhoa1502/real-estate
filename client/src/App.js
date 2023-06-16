import { Routes, Route } from "react-router-dom";
import { path } from "./utils/path/path";
import { Home, Login, SearchDetail } from "./components/Public";
import { CreatePost } from "./components/System";

import { DetailPage, HomePage, CategoryPage, System } from "./pages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(getCurrentUser());
    }, 100);
  }, [isLoggedIn, dispatch]);

  return (
    <div className=" bg-primaryWhite overflow-x-auto">
      <Routes>
        <Route path={path.HOME} element={<HomePage />}>
          <Route path="*" element={<Home />} />
          <Route path={path.HOME__PAGE} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.SIGNUP} element={<Login register={true} />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<CategoryPage />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<CategoryPage />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<CategoryPage />} />
          <Route path={path.NHA_CHO_THUE} element={<CategoryPage />} />
          <Route path={path.TIM_KIEM} element={<SearchDetail />} />
          <Route path={path.CHI_TIET__TITLE__POSTID} element={<DetailPage />} />
        </Route>
        <Route path={path.QUAN_LY} element={<System />}>
          <Route path={path.DANG_TIN_MOI} element={<CreatePost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
