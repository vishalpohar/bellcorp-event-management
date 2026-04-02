import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const register = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const res = await axios.post("/auth/register", {
        name: username,
        email,
        password,
      });
      toast.success(res.data.message);
      return true;
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", { email, password });
      const { user } = res.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const res = await axios.post("/auth/logout");
    setUser(null);
    toast.success(res.data.message || "You have been logged out", {
      id: "auth",
    });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          setUser(null);
        }
        return Promise.reject(error);
      },
    );
    return () => axios.interceptors.response.eject(interceptor);
  });

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
