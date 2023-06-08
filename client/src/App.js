import { Routes, Route } from "react-router-dom";
import { path } from "./utils/path";
import { Home, Login } from "./containers/Public";

function App() {
  return (
    <div className="w-screen h-screen bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.SIGNUP} element={<Login register={true} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
