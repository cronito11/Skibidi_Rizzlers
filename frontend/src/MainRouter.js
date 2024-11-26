import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";

import Home from "./components/home/Home";
import Signup from "./components/signup/signup";
import { useState } from "react";
import RefreshHandler from "./RefreshHandler";
import Schedule from "./components/schedule/Schedule";
import CalendarPage from "./components/home/CalendarPage";
import LandingPage from "./components/home/LandingPage.js";
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
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route
            exact
            path="/home"
            element={<PrivateRoute element={<Home />} />}
          />
          <Route
            exact
            path="/schedule"
            element={<PrivateRoute element={<Schedule />} />}
          />
          <Route
            exact
            path="/calendar"
            element={<PrivateRoute element={<CalendarPage />} />}
          />
        </Routes>
      </div>
    </>
  );
};

export default MainRouter;
