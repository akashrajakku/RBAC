
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProtectedAdmin from "./components/functional/ProtectedAdmin";
import UsersAuth from "./pages/auth/UsersAuth";

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
