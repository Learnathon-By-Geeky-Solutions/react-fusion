import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import useAuth from "@/src/context/authContext";
import { authService } from "@/src/services/auth";

export default function Login() {
  const { user, storeToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.authenticated) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogIn = async (data) => {
    const result = await authService.logInUser(data);
    if (result.success) {
      alert("Log In Successful!");
      storeToken(result.data.accessToken);
    } else {
      alert("ERROR!");
    }
  };

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleLogIn(values);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-[400px] p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center">Log In</h1>
        <p className="text-gray-600 text-center">Enter your credentials</p>
        <form onSubmit={loginFormik.handleSubmit} className="mt-4">
          <div className="mb-3">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              id="email"
              type="email"
              className="w-full border px-3 py-2 rounded-md"
              onChange={loginFormik.handleChange}
              value={loginFormik.values.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input
              id="password"
              type="password"
              className="w-full border px-3 py-2 rounded-md"
              onChange={loginFormik.handleChange}
              value={loginFormik.values.password}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Log In
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <button className="text-blue-500 hover:underline" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
