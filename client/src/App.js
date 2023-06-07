import { Routes, Route } from "react-router-dom";
import { path } from "./utils/path";
import { Home, Login } from "./containers/Public";

function App() {
  return (
    <div className="w-screen h-screen bg-primaryBlue">
      <Routes>
        <Route path={path.HOME} element={<Home />} />
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
