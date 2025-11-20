import React from "react";
import { Navigate, Route, Routes } from "react-router";
import useAuth from "./zustand/useAuth.js";
import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import LoadingScroll from "./Components/LoadingScroll.jsx";

const App = () => {
  const { authUser, checkAuth, LoadingAuth } = useAuth();

  React.useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (LoadingAuth) return <LoadingScroll />;

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
