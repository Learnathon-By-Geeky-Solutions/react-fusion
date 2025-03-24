import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getSingleCourse from "@/src/services/singleCourse";
import { noimage } from "../../assets";

export default function CourseDetails() {
  const { id } = useParams(); 
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const data = await getSingleCourse(id);
        setCourse(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading course details...</p>;
  if (!course) return <p className="text-center text-red-500">Course not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {console.log(course)}
      {/* Left Side: Course Details */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
        <p className="text-gray-700 mt-4">{course.description}</p>

        {/* Instructors Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-900">Instructors</h2>
          <div className="mt-4 space-y-4">
            {course.instructors.map((instructor, index) => (
              <div key={index} className="p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold">{instructor.name}</h3>
                <p className="text-sm text-gray-600">{instructor.designation}</p>
                <p className="text-sm text-gray-500">
                  {instructor.currentWorkingPlace}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 bg-white shadow-lg rounded-lg">
        {/* {console.log(course.thumbnail)} */}
        <img
          src={course.thumbnail === "str" ? noimage : course.thumbnail}
          alt={course.title}
          className="w-full h-60 object-cover rounded-lg"
        />
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-900">⭐ {course.rating} / 5</p>
          <p className="text-xl font-bold text-blue-500">${course.price}</p>
        </div>
        <button className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
          Buy This Course
        </button>
      </div>
    </div>
  );
}
