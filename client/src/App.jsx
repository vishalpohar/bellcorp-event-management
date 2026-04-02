import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { useAuth } from "./context/AuthContext";

import AuthLayout from "./layouts/AuthLayout";
import PublicLayout from "./layouts/PublicLayout";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const { user } = useAuth();

  useEffect(() => {
    const handlePopState = () => {
      if (!user) {
        window.location.reload();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [user]);

  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <LoginPage />}
          />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
