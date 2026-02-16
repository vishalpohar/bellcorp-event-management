import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthContext";
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
    <div className="min-h-screen flex flex-col px-4 py-4">
      <Navbar />
      <main className="flex-1 pt-24 sm:pt-16 px-2 md:px-10 lg:px-20 pb-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <LoginPage />}
          />
        </Routes>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
