import React from "react";
import { useFormik } from "formik";
import { authService } from "@/src/services/auth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    const result = await authService.signUpUser(data);
    if (result.success) {
      alert("User Created. Please log in.");
      navigate("/login");
    } else {
      alert("ERROR!");
    }
  };

  const signupFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      contactNumber: "",
      currentInstitution: "",
      gender: "",
      qualification: "",
      address: "",
    },
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-[400px] p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <p className="text-gray-600 text-center">Create a new account</p>
        <form onSubmit={signupFormik.handleSubmit} className="mt-4 space-y-3">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
            <input
              id="name"
              className="w-full border px-3 py-2 rounded-md"
              onChange={signupFormik.handleChange}
              value={signupFormik.values.name}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              id="email"
              type="email"
              className="w-full border px-3 py-2 rounded-md"
              onChange={signupFormik.handleChange}
              value={signupFormik.values.email}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input
              id="password"
              type="password"
              className="w-full border px-3 py-2 rounded-md"
              onChange={signupFormik.handleChange}
              value={signupFormik.values.password}
            />
          </div>
          <div>
            <label htmlFor="contactNumber" className="block text-gray-700 font-medium">Contact Number</label>
            <input
              id="contactNumber"
              className="w-full border px-3 py-2 rounded-md"
              onChange={signupFormik.handleChange}
              value={signupFormik.values.contactNumber}
            />
          </div>
          <div>
            <label htmlFor="gender" className="block text-gray-700 font-medium">Gender</label>
            <select
              id="gender"
              className="w-full border px-3 py-2 rounded-md"
              onChange={signupFormik.handleChange}
              value={signupFormik.values.gender}
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="currentInstitution" className="block text-gray-700 font-medium">Current Institution</label>
            <input
              id="currentInstitution"
              className="w-full border px-3 py-2 rounded-md"
              onChange={signupFormik.handleChange}
              value={signupFormik.values.currentInstitution}
            />
          </div>
          <div>
            <label htmlFor="qualification" className="block text-gray-700 font-medium">Qualification</label>
            <select
              id="qualification"
              className="w-full border px-3 py-2 rounded-md"
              onChange={signupFormik.handleChange}
              value={signupFormik.values.qualification}
            >
              <option value="">Select Qualification</option>
              <option value="HIGH_SCHOOL">High School</option>
              <option value="BACHELORS">Bachelors</option>
              <option value="MASTERS">Masters</option>
              <option value="PHD">PhD</option>
            </select>
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700 font-medium">Address</label>
            <input
              id="address"
              className="w-full border px-3 py-2 rounded-md"
              onChange={signupFormik.handleChange}
              value={signupFormik.values.address}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-700">
            Already have an account?{" "}
            <button className="text-blue-500 hover:underline" onClick={() => navigate("/login")}>
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
