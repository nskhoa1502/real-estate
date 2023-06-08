import { Routes, Route } from "react-router-dom";
import { path } from "./utils/path";
import { Home, Login } from "./components/Public";

import {
  HomePage,
  RentalApartment,
  RentalHouse,
  RentalRoom,
  RentalSpace,
} from "./pages";

function App() {
  return (
    <div className="w-screen h-screen bg-primaryWhite">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={(path = `*`)} element={<HomePage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.SIGNUP} element={<Login register={true} />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<RentalApartment />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<RentalSpace />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<RentalRoom />} />
          <Route path={path.NHA_CHO_THUE} element={<RentalHouse />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
