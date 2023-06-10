import { Routes, Route } from "react-router-dom";
import { path } from "./utils/path/path";
import { Home, Login } from "./components/Public";

import {
  DetailPage,
  HomePage,
  RentalApartment,
  RentalHouse,
  RentalRoom,
  RentalSpace,
} from "./pages";

function App() {
  return (
    <div className=" bg-primaryWhite overflow-x-auto">
      <Routes>
        <Route path={path.HOME} element={<HomePage />}>
          <Route path="*" element={<Home />} />
          <Route path={path.HOME__PAGE} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.SIGNUP} element={<Login register={true} />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<RentalApartment />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<RentalSpace />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<RentalRoom />} />
          <Route path={path.NHA_CHO_THUE} element={<RentalHouse />} />
          <Route path={path.CHI_TIET__TITLE__POSTID} element={<DetailPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
