import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/src/context/authContext";
import { addCourse } from "@/src/services/addCourse";

export default function AddCourse() {
  const navigate = useNavigate();
  const { instructor } = useAuth();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    milestones: [],
  });

  // Function to update course state dynamically
  const updateCourseState = (path, value) => {
    setCourse((prevCourse) => {
      const updatedCourse = { ...prevCourse };
      let ref = updatedCourse;
      const keys = path.split(".");
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          ref[key] = value;
        } else {
          ref = ref[key];
        }
      });
      return updatedCourse;
    });
  };

  // Add new milestone
  const addMilestone = () => {
    setCourse((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        { title: "", description: "", modules: [], quizes: [] },
      ],
    }));
  };

  // Remove milestone
  const removeMilestone = (index) => {
    setCourse((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index),
    }));
  };

  // Add new module
  const addModule = (milestoneIndex) => {
    setCourse((prev) => {
      const updatedMilestones = [...prev.milestones];
      updatedMilestones[milestoneIndex].modules.push({
        title: "",
        description: "",
        videos: [],
      });
      return { ...prev, milestones: updatedMilestones };
    });
  };

  // Remove module
  const removeModule = (milestoneIndex, moduleIndex) => {
    setCourse((prev) => {
      const updatedMilestones = [...prev.milestones];
      updatedMilestones[milestoneIndex].modules = updatedMilestones[milestoneIndex].modules.filter(
        (_, i) => i !== moduleIndex
      );
      return { ...prev, milestones: updatedMilestones };
    });
  };

  // Add new video
  const addVideo = (milestoneIndex, moduleIndex) => {
    setCourse((prev) => {
      const updatedMilestones = [...prev.milestones];
      updatedMilestones[milestoneIndex].modules[moduleIndex].videos.push({
        title: "",
        url: "",
      });
      return { ...prev, milestones: updatedMilestones };
    });
  };

  // Remove video
  const removeVideo = (milestoneIndex, moduleIndex, videoIndex) => {
    setCourse((prev) => {
      const updatedMilestones = [...prev.milestones];
      updatedMilestones[milestoneIndex].modules[moduleIndex].videos = updatedMilestones[milestoneIndex].modules[
        moduleIndex
      ].videos.filter((_, i) => i !== videoIndex);
      return { ...prev, milestones: updatedMilestones };
    });
  };

  // Add new quiz
  const addQuiz = (milestoneIndex) => {
    setCourse((prev) => {
      const updatedMilestones = [...prev.milestones];
      updatedMilestones[milestoneIndex].quizes.push({
        questions: [],
      });
      return { ...prev, milestones: updatedMilestones };
    });
  };

  // Remove quiz
  const removeQuiz = (milestoneIndex, quizIndex) => {
    setCourse((prev) => {
      const updatedMilestones = [...prev.milestones];
      updatedMilestones[milestoneIndex].quizes = updatedMilestones[milestoneIndex].quizes.filter(
        (_, i) => i !== quizIndex
      );
      return { ...prev, milestones: updatedMilestones };
    });
  };

  // Add new question
  const addQuestion = (milestoneIndex, quizIndex) => {
    setCourse((prev) => {
      const updatedMilestones = [...prev.milestones];
      updatedMilestones[milestoneIndex].quizes[quizIndex].questions.push({
        question: "",
        options: ["", "", "", ""],
        answer: "",
        points: "",
      });
      return { ...prev, milestones: updatedMilestones };
    });
  };

  // Remove question
  const removeQuestion = (milestoneIndex, quizIndex, questionIndex) => {
    setCourse((prev) => {
      const updatedMilestones = [...prev.milestones];
      updatedMilestones[milestoneIndex].quizes[quizIndex].questions = updatedMilestones[milestoneIndex].quizes[
        quizIndex
      ].questions.filter((_, i) => i !== questionIndex);
      return { ...prev, milestones: updatedMilestones };
    });
  };

  const handleSubmit = async () => {
    try {
      const token = instructor.token;
      await addCourse(course, token);
      alert("Course added successfully!");
      navigate("/courses");
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course.");
    }
  };

  return (
    <div className="p-6 max-w-[800px] mx-auto">
      <h1 className="text-3xl font-bold text-center">Add New Course</h1>

      {/* Course Fields */}
      <input type="text" placeholder="Course Title" className="w-full border p-2 mt-4 rounded-lg"
        onChange={(e) => updateCourseState("title", e.target.value)} />

      <textarea placeholder="Course Description" className="w-full border p-2 mt-2 rounded-lg"
        onChange={(e) => updateCourseState("description", e.target.value)} />

      <input type="number" placeholder="Course Price" className="w-full border p-2 mt-2 rounded-lg"
        onChange={(e) => updateCourseState("price", e.target.value)} />

      <button className="mt-4 px-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition" onClick={addMilestone}>
        Add Milestone
      </button>

      {course.milestones.map((milestone, milestoneIndex) => (
        <div key={milestoneIndex} className="mt-4 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">Milestone {milestoneIndex + 1}</h2>
          <button className="text-red-500" onClick={() => removeMilestone(milestoneIndex)}>Remove</button>

          <button className="mt-2 px-4 bg-blue-500 text-white py-2 rounded-lg" onClick={() => addModule(milestoneIndex)}>
            Add Module
          </button>
          <button className="mt-2 px-4 bg-purple-500 text-white py-2 rounded-lg ml-2" onClick={() => addQuiz(milestoneIndex)}>
            Add Quiz
          </button>

          {/* Modules */}
          {milestone.modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className="border mt-2 p-3 rounded-lg">
              <h3>Module {moduleIndex + 1}</h3>
              <button className="text-red-500" onClick={() => removeModule(milestoneIndex, moduleIndex)}>Remove</button>
              <button className="bg-gray-500 text-white py-1 px-3 rounded mt-2" onClick={() => addVideo(milestoneIndex, moduleIndex)}>
                Add Video
              </button>
            </div>
          ))}
        </div>
      ))}

      <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition" onClick={handleSubmit}>
        Submit Course
      </button>
    </div>
  );
}
