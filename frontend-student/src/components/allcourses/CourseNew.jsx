import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getAllCourses from "@/src/services/course";
import { noimage } from "../../assets";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await getAllCourses();
        setCourses(data.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const getThumbnail = (thumbnail) => {
    return thumbnail === "str" ? noimage : thumbnail;
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center my-10">
          <span className="loading loading-dots loading-lg text-primary"></span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="alert alert-error shadow-lg mb-6">
          <span>{error}</span>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="card bg-base-100 shadow-xl">
            <figure className="h-60 w-full">
              <img
                src={getThumbnail(course.thumbnail)}
                alt={course.title}
                className="object-cover w-full h-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{course.title}</h2>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-primary font-bold">৳ {course.price}</p>
                  {course.rating === null ? (
                    <p className="text-sm text-gray-500">⭐ No Ratings</p>
                  ) : (
                    <p className="text-sm text-gray-500">⭐ {course.rating} / 5</p>
                  )}
                </div>
                <Link to={`/courses/${course.id}`}>
                  <button className="btn btn-primary btn-sm">View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-[1280px] mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold mb-2">All Courses</h1>
        <p className="text-gray-600">
          Explore our wide range of courses to boost your skills and career.
        </p>
      </div>
      {renderContent()}
    </div>
  );
}
