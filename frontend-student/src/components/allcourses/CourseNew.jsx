import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getAllCourses from "@/src/services/course";
import { noimage } from "../../assets";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

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
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-primary"></div>
        </div>
      );
    }

    if (error) {
      return (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id}>
            <img
              src={getThumbnail(course.thumbnail)}
              alt={course.title}
              className="w-full h-60 object-cover rounded-t-md"
            />
            <CardContent className="space-y-4">
              <CardHeader className="p-0">
                <CardTitle>{course.title}</CardTitle>
              </CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-primary font-bold">৳ {course.price}</p>
                  <p className="text-sm text-muted-foreground">
                    {course.rating === null ? "⭐ No Ratings" : `⭐ ${course.rating} / 5`}
                  </p>
                </div>
                <Link to={`/courses/${course.id}`}>
                  <Button size="sm">View Details</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-[1280px] mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold mb-2">All Courses</h1>
        <p className="text-muted-foreground">
          Explore our wide range of courses to boost your skills and career.
        </p>
      </div>
      {renderContent()}
    </div>
  );
}
