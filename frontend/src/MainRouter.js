import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";

import Home from "./components/home/Home";
import Signup from "./components/signup/signup";
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";

const MainRouter = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <div>
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route
            exact
            path="/home"
            element={<PrivateRoute element={<Home />} />}
          />
        </Routes>
      </div>
    </>
  );
};

export default MainRouter;
