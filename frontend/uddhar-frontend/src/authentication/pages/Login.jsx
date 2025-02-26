import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Cookies from "js-cookie";

function Login() {
  const [showPassword, setShowPassword] = useState("true");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set("token", data.token);
        console.log(data.msg);
        window.location.href = "/";
      } else {
        setError(data.message)
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred");
    }
  };
  
  return (
    <div className="w-full min-h-screen flex items-start bg-gradient-to-r from-gray-100 shadow-lg to-yellow-200">
      <div className="w-full h-full flex flex-col p-5 md:p-20 justify-between items-center">
        <div>
          <h1 className="text-xl md:text-3xl font-montserrat mb-4 font-bold">
            Join, Connect & Conqure
          </h1>
        </div>
        <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col gap-2 p-8 md:p-14 bg-white shadow-2xl rounded-lg">
          <form onSubmit={handleLogin}>
            <div className="w-full flex flex-col mb-3">
              <h3 className="text-xl lg:text-3xl font-mono font-bold mb-4">
                Login
              </h3>
              <p className="text-sm md:text-lg font-sans text-gray-400">
                Welcome back! Please enter your details
              </p>
            </div>

            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <input
                  id="email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none px-2"
                />
              </div>
              <div className="flex items-center border-b-2 border-gray-300 py-2">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none px-2"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <FaEye className="text-xl md:text-2xl text-gray-400" />
                  ) : (
                    <FaEyeSlash className="text-xl md:text-2xl text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-sm md:text-lg font-sans mt-2">
                {error}
              </div>
            )}
            <div className="flex flex-col gap-1 md:gap-5">
              <button
                type="submit"
                className="w-2/3  self-center rounded-md bg-amber-700 text-white text-sm md:text-xl mt-2 py-2"
              >
                Login
              </button>
              <button className="w-full text-blue-400 font-bold text-sm md:text-lg ">
               <a href="/password-recovery">Forget password?</a>
              </button>
              
            </div>
          </form>
        </div>
        <div className="w-full flex justify-center items-center text-sm md:text-lg font-mono my-4">
          <p>
            Don't have an account?
            <span className="font-montserrat font-semibold underline underline-offset-2 cursor-pointer">
              <a href="/sign-up">Sign up for free</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
