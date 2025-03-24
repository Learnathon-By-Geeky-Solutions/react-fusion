import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getSingleCourse from "@/src/services/singleCourse";
import { noimage } from "../../assets";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await getSingleCourse(id);
        console.log(response); // Debugging
        if (response.success) {
          setCourse(response.data); // Ensure we're setting the correct data
        }
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
    <div className="max-w-[1280px] mx-auto">
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 py-8">
        {/* Left Side: Course Details (Takes 2/3 in desktop) */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-gray-700 mt-4 text-left">{course.description}</p>

          {/* Course Milestones & Modules Accordion */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900">Course Content</h2>
            <Accordion type="single" collapsible className="mt-4">
              {course.milestones.map((milestone) => (
                <AccordionItem
                  key={milestone.id}
                  value={milestone.id}
                  className="bg-gray-300 rounded-lg p-2 mb-2"
                >
                  <AccordionTrigger className="font-semibold text-lg">
                    {milestone.title}
                  </AccordionTrigger>
                  <AccordionContent className="ml-4">
                    {milestone.modules.map((module) => (
                      <div key={module.id} className="bg-gray-100 p-4 rounded-lg mb-2 text-left mx-6">
                        {module.title}
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Right Side: Thumbnail, Pricing & Instructor Info (Takes 1/3 in desktop) */}
        <div className="md:col-span-1 p-6 bg-white shadow-lg rounded-lg">
          <img
            src={course.thumbnail === "str" ? noimage : course.thumbnail}
            alt={course.title}
            className="w-full h-60 object-cover rounded-lg"
          />
          <div className="mt-4 flex items-center justify-between">
            <p className="text-lg font-semibold text-gray-900">
              {course.rating === null ? "⭐ No Ratings" : `⭐ ${course.rating} / 5`}
            </p>
            <p className="text-xl font-bold text-blue-500">৳ {course.price}</p>
          </div>

          {/* Instructor Info */}
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">{course.instructor.name}</h2>
            <p className="text-sm text-gray-600">{course.instructor.designation}</p>
            <p className="text-sm text-gray-500">{course.instructor.currentWorkingPlace}</p>
            <p className="text-sm text-gray-500">Experience: {course.instructor.experience} years</p>
            <p className="text-sm text-gray-500">Contact: {course.instructor.contactNumber}</p>
          </div>

          <button className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
            Buy This Course
          </button>
        </div>
      </div>
    </div>
  );
}
