import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getAllCourses from "@/src/services/course";
import { noimage } from "../../assets";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  return (
    <div className="p-6 max-w-[1280px] mx-auto">
      <h1 className="text-3xl font-bold">All Courses</h1>
      <p className="text-gray-600 mb-6">
        Explore our wide range of courses to boost your skills and career.
      </p>

      {loading ? (
        <p className="text-gray-600">Loading courses...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {courses.map((course) => (
            <Card key={course.id} className="shadow-lg">
              <CardHeader>
                <img
                  src={course.thumbnail === "str" ? noimage : course.thumbnail}
                  alt={course.title}
                  className="w-full h-60 object-cover rounded-lg"
                />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl font-semibold">
                  {course.title}
                </CardTitle>
              </CardContent>
              <CardFooter className={`flex flex-row items-center justify-between`}>
                <Link to={`/courses/${course.id}`}>
                  <button className="px-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
                    View Details
                  </button>
                </Link>
                <div className="flex flex-col items-end">
                  <p className="text-lg font-bold text-blue-500">
                    ৳ {course.price}
                  </p>
                  {course.rating === null ? (
                    <div className="text-gray-600 flex items-center">
                      ⭐ No Ratings
                    </div>
                  ) : (
                    <p className="text-gray-600">⭐ {course.rating} / 5</p>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
