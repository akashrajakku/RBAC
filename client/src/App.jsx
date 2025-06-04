
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedAdmin from "./components/functional/ProtectedAdmin";
import UsersAuth from "./pages/UsersAuth";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/welcome"
          element={
            <ProtectedAdmin>
              <Home />
            </ProtectedAdmin>
          }
        />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users/auth" element={<UsersAuth />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
