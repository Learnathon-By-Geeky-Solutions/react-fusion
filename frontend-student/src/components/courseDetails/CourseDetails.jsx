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
        if (response.success) {
          setCourse(response.data);
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
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 py-8">
        {/* Left Side: Course Details */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
          <p className="text-gray-700 mt-4 text-left">{course.description}</p>

          {/* Course Modules Accordion */}
          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-900">Course Content</h2>
            <Accordion type="single" collapsible className="mt-4">
              {course.milestones.map((milestone) => (
                <AccordionItem
                  key={milestone.id}
                  value={milestone.id}
                  className="bg-gray-300 rounded-lg p-2 mb-2"
                >
                  <AccordionTrigger className="font-semibold text-lg px-4">
                    {milestone.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    {milestone.modules.map((module) => (
                      <Accordion type="single" collapsible key={module.id} className="mx-4 mt-2">
                        <AccordionItem value={module.id} className="bg-gray-100 py-1 px-4 rounded-lg">
                          <AccordionTrigger className="text-lg font-semibold">
                            {module.title}
                          </AccordionTrigger>
                          <AccordionContent className="space-y-2 mt-2">
                            {module.videos.map((video, index) => (
                              <div
                                key={video.id}
                                className="bg-gray-200 py-2 px-4 rounded-md text-left"
                              >
                                Video {index + 1}: {video.title}
                              </div>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Right Side: Thumbnail, Pricing & Instructor Info */}
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
