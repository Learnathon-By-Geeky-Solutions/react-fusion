import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { toast, Toaster } from "sonner";
import useInstructorAuth from "@/src/context/authContext";
import { instructorAuthService } from "@/src/services/auth";

export default function InstructorLogin() {
  const { instructor, storeToken } = useInstructorAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (instructor.authenticated) {
      navigate("/dashboard");
    }
  }, [instructor, navigate]);

  const handleLogIn = async (data) => {
    const result = await instructorAuthService.logInInstructor(data);
    if (result.success) {
      toast.success("Log In Successful!");
      storeToken(result.data.accessToken);
      navigate("/dashboard");
    } else {
      toast.error("ERROR!");
    }
  };

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogIn,
  });

  return (
    <div className="flex flex-col items-center justify-center mt-14">
      <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Instructor Log In</h2>
        <p className="text-sm text-gray-500 mb-4">Enter email and password to log in</p>

        <form onSubmit={loginFormik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded-md"
              onChange={loginFormik.handleChange}
              value={loginFormik.values.email}
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded-md"
              onChange={loginFormik.handleChange}
              value={loginFormik.values.password}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
