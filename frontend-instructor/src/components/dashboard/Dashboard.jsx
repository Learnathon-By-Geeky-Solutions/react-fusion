import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useAuth from "@/src/context/authContext";
import getAllCourses from "@/src/services/course";
import { noimage } from "../../assets";

export default function CourseDashboard() {
  const { instructor, isLoading } = useAuth(); // Ensure loading is handled
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getAllCourses(instructor?.token); // pass token
        setCourses(data.data?.slice(0, 5) || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  
    if (instructor?.authenticated) {
      fetchCourses();
    }
  }, [instructor]);

  const getThumbnail = (thumbnail) => {
    return thumbnail === "str" ? noimage : thumbnail;
  };

  if (isLoading) {
    return <p className="text-gray-600">Checking authentication...</p>; // Wait for auth to load
  }

  if (!instructor?.authenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="p-6 max-w-[1280px] mx-auto">
      <h1 className="text-3xl font-bold text-center">All Courses</h1>

      {loading ? (
        <p className="text-gray-600">Loading courses...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="flex bg-white shadow-md p-4 rounded-lg items-center">
              <img
                src={getThumbnail(course.thumbnail)}
                alt={course.title}
                className="w-32 h-20 object-cover rounded-lg"
              />

              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p className="text-gray-600">Instructor: {course.instructor?.name || "Unknown"}</p>
                <p className="text-yellow-500">Rating: {course.rating ?? "N/A"} ⭐</p>
                <p className="text-lg font-bold text-blue-500">৳ {course.price}</p>

                <div className="mt-2 flex gap-3">
                  <Link to={`/courses/${course.id}`}>
                    <button className="px-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                      View Details
                    </button>
                  </Link>
                  <button className="px-4 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
