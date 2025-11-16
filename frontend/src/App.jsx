import React from "react";
import { Navigate, Route, Routes } from "react-router";
import useAuth from "./zustand/useAuth.js";
import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";

const App = () => {
  const { authUser, checkAuth } = useAuth();

  React.useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen">
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={!authUser ? <RegisterPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
