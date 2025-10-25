// App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
const App = () => {
  const{authUser}=useContext(AuthContext);
  return (
    <div
      className="min-h-screen bg-black bg-no-repeat bg-center bg-contain bg-fixed
                 bg-[url('/bgImage.svg')]"
    >
      <Toaster />
      <Routes>
        <Route path="/" element={ authUser ?<HomePage />:<Navigate to="/login"/>} />
        <Route path="/login" element={!authUser ?<LoginPage />:<Navigate to="/"/>} />
        <Route path="/profile" element={authUser?<ProfilePage />: <Navigate to="/login"/>} />
      </Routes>
    </div>
  );
};

export default App;
