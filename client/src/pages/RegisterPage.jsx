import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register, loading } = useAuth();

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(email, password);
    if (!username || !email || !password) {
      return setError("All fields are required");
    }
    const success = await register({ username, email, password });

    if (success) navigate("/login");
  };

  return (
    <div className="min-h-full flex flex-col justify-center items-center mt-14">
      <div className="flex flex-col justify-center gap-6 shadow-md rounded-lg border-2 border-gray-400/10 min-w-[360px] min-h-[460px] p-6">
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col justify-center gap-4">
          <h1 className="text-2xl font-serif text-center">Register</h1>
          <input
            className="border-2 border-gray-300 outline-none focus:border-blue-400 rounded-md px-2 py-1"
            type="text"
            value={username}
            placeholder="username"
            onChange={(e) => setUserName(e.target.value)}
            title="Username is required"
          />
          <input
            className="border-2 border-gray-300 outline-none focus:border-blue-400 rounded-md px-2 py-1"
            type="email"
            value={email}
            placeholder="username@domain.com"
            onChange={(e) => setEmail(e.target.value)}
            title="Email is required"
          />
          <div className="relative border-2 border-gray-300 focus-within:border-blue-400 rounded-md px-1">
            <input
              className="outline-none px-2 py-1"
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              title="Password must be 8+ characters, include uppercase, lowercase, number and special character"
            />
            <button
              className="absolute right-1 top-[6px]"
              type="button"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff size={22} color="gray" />
              ) : (
                <Eye size={22} color="gray" />
              )}
            </button>
          </div>
          <button
            className={`bg-blue-500 text-white rounded-md py-1 ${loading && "cursor-not-allowed"}`}
            type="submit"
            disabled={loading}>
            {loading ? "Signing you up..." : "Sign Up"}
          </button>
          <p className="text-red-500 text-xs text-center h-1">{error}</p>
        </form>
        <hr className="h-[2px] bg-gray-300" />
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline"
            type="button">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
