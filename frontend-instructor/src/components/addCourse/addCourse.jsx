import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/src/context/authContext";
import { addCourse } from "@/src/services/addCourse";
import { useApi } from "@/src/hooks/useApi";

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

  const addMilestone = () => {
    setCourse({
      ...course,
      milestones: [...course.milestones, { title: "", description: "", modules: [] }],
    });
  };

  const addModule = (milestoneIndex) => {
    const updatedMilestones = [...course.milestones];
    updatedMilestones[milestoneIndex].modules.push({
      title: "",
      description: "",
      videos: [],
      quizes: [],
    });
    setCourse({ ...course, milestones: updatedMilestones });
  };

  const addVideo = (milestoneIndex, moduleIndex) => {
    const updatedMilestones = [...course.milestones];
    updatedMilestones[milestoneIndex].modules[moduleIndex].videos.push({
      title: "",
      url: "",
      length: "", 
    });
    setCourse({ ...course, milestones: updatedMilestones });
  };

  const addQuestion = (milestoneIndex, moduleIndex) => {
    const updatedMilestones = [...course.milestones];
    updatedMilestones[milestoneIndex].modules[moduleIndex].quizes.push({
      question: "",
      options: ["", "", "", ""],
      answer: "",
      value: "", 
    });
    setCourse({ ...course, milestones: updatedMilestones });
  };

  const handleInputChange = (e, path) => {
    const updatedCourse = { ...course };
    let ref = updatedCourse;
    const parts = path.split(".");
    
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (part.includes("[")) {
        // Handle array access
        const keyName = part.substring(0, part.indexOf("["));
        const index = parseInt(part.substring(part.indexOf("[") + 1, part.indexOf("]")));
        ref = ref[keyName][index];
      } else {
        ref = ref[part];
      }
    }
    
    const lastPart = parts[parts.length - 1];
    if (lastPart.includes("[")) {
      const keyName = lastPart.substring(0, lastPart.indexOf("["));
      const index = parseInt(lastPart.substring(lastPart.indexOf("[") + 1, lastPart.indexOf("]")));
      ref[keyName][index] = e.target.value;
    } else {
      ref[lastPart] = e.target.value;
    }
    
    setCourse(updatedCourse);
  };

  const handleSubmit = async () => {
    try {
      const validatedCourse = { ...course };
      
      validatedCourse.price = Number(validatedCourse.price);
      
      // Validate that modules with quizzes have questions
      let isValid = true;
      validatedCourse.milestones.forEach((milestone) => {
        milestone.modules.forEach((module) => {
          if (module.quizes.length > 0 && module.quizes.some(q => !q.question || !q.answer)) {
            alert("Please complete all quiz questions and answers.");
            isValid = false;
          }
        });
      });
      
      if (!isValid) return;

      const token = instructor.token;
      await addCourse(validatedCourse, token);
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

      {/* Course Details */}
      <input
        type="text"
        placeholder="Course Title"
        value={course.title}
        onChange={(e) => handleInputChange(e, "title")}
        className="w-full p-2 border mt-4 rounded-lg"
      />
      <textarea
        placeholder="Course Description"
        value={course.description}
        onChange={(e) => handleInputChange(e, "description")}
        className="w-full p-2 border mt-2 rounded-lg"
      />
      <input
        type="number"
        placeholder="Course Price"
        value={course.price}
        onChange={(e) => handleInputChange(e, "price")}
        className="w-full p-2 border mt-2 rounded-lg"
      />
      <input
        type="text"
        placeholder="Thumbnail URL"
        value={course.thumbnail}
        onChange={(e) => handleInputChange(e, "thumbnail")}
        className="w-full p-2 border mt-2 rounded-lg"
      />

      {/* Milestones List */}
      {course.milestones.map((milestone, milestoneIndex) => (
        <div key={milestoneIndex} className="mt-4 p-4 bg-gray-600 text-white rounded-lg">
          <h2 className="text-lg font-semibold">Milestone {milestoneIndex + 1}</h2>
          <input
            type="text"
            placeholder="Milestone Title"
            value={milestone.title}
            onChange={(e) => handleInputChange(e, `milestones[${milestoneIndex}].title`)}
            className="w-full p-2 border mt-2 rounded-lg"
          />
          <textarea
            placeholder="Milestone Description"
            value={milestone.description}
            onChange={(e) => handleInputChange(e, `milestones[${milestoneIndex}].description`)}
            className="w-full p-2 border mt-2 rounded-lg"
          />

          {/* Modules List */}
          {milestone.modules && milestone.modules.map((module, moduleIndex) => (
            <div key={moduleIndex} className="mt-2 p-3 bg-gray-400 text-black rounded-lg">
              <h3 className="font-medium">Module {moduleIndex + 1}</h3>
              <input
                type="text"
                placeholder="Module Title"
                value={module.title}
                onChange={(e) => handleInputChange(e, `milestones[${milestoneIndex}].modules[${moduleIndex}].title`)}
                className="w-full p-2 border mt-2 rounded-lg"
              />
              <textarea
                placeholder="Module Description"
                value={module.description}
                onChange={(e) => handleInputChange(e, `milestones[${milestoneIndex}].modules[${moduleIndex}].description`)}
                className="w-full p-2 border mt-2 rounded-lg"
              />

              {/* Videos Section */}
              <div className="mt-3">
                <h4 className="font-medium">Videos</h4>
                {module.videos && module.videos.map((video, videoIndex) => (
                  <div key={videoIndex} className="mt-2 p-3 bg-gray-200 text-black rounded-lg">
                    <h5 className="font-medium">Video {videoIndex + 1}</h5>
                    <input
                      type="text"
                      placeholder="Video Title"
                      value={video.title}
                      onChange={(e) => handleInputChange(e, `milestones[${milestoneIndex}].modules[${moduleIndex}].videos[${videoIndex}].title`)}
                      className="w-full p-2 border mt-2 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Video URL"
                      value={video.url}
                      onChange={(e) => handleInputChange(e, `milestones[${milestoneIndex}].modules[${moduleIndex}].videos[${videoIndex}].url`)}
                      className="w-full p-2 border mt-2 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Video Length (e.g., 10:30)"
                      value={video.length}
                      onChange={(e) => handleInputChange(e, `milestones[${milestoneIndex}].modules[${moduleIndex}].videos[${videoIndex}].length`)}
                      className="w-full p-2 border mt-2 rounded-lg"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addVideo(milestoneIndex, moduleIndex)}
                  className="mt-2 px-4 bg-purple-500 text-white py-1 rounded-lg hover:bg-purple-600 transition"
                >
                  Add Video
                </button>
              </div>

              {/* Quiz Section */}
              <div className="mt-3">
                <h4 className="font-medium">Quiz</h4>
                {module.quizes && module.quizes.map((quiz, quizIndex) => (
                  <div key={quizIndex} className="mt-2 p-3 bg-gray-200 text-black rounded-lg">
                    <h5 className="font-medium">Question {quizIndex + 1}</h5>
                    <input
                      type="text"
                      placeholder="Question"
                      value={quiz.question}
                      onChange={(e) => handleInputChange(e, `milestones[${milestoneIndex}].modules[${moduleIndex}].quizes[${quizIndex}].question`)}
                      className="w-full p-2 border mt-2 rounded-lg"
                    />
                    {quiz.options.map((option, optionIndex) => (
                      <input
                        key={optionIndex}
                        type="text"
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) => handleInputChange(e, `milestones[${milestoneIndex}].modules[${moduleIndex}].quizes[${quizIndex}].options[${optionIndex}]`)}
                        className="w-full p-2 border mt-2 rounded-lg"
                      />
                    ))}
                    <input
                      type="text"
                      placeholder="Correct Answer"
                      value={quiz.answer}
                      onChange={(e) => handleInputChange(e, `milestones[${milestoneIndex}].modules[${moduleIndex}].quizes[${quizIndex}].answer`)}
                      className="w-full p-2 border mt-2 rounded-lg"
                    />
                    <input
                      type="number"
                      placeholder="Points"
                      value={quiz.value}
                      onChange={(e) => handleInputChange(e, `milestones[${milestoneIndex}].modules[${moduleIndex}].quizes[${quizIndex}].value`)}
                      className="w-full p-2 border mt-2 rounded-lg"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addQuestion(milestoneIndex, moduleIndex)}
                  className="mt-2 px-4 bg-red-500 text-white py-1 rounded-lg hover:bg-red-600 transition"
                >
                  Add Question
                </button>
              </div>
            </div>
          ))}

          {/* Add Module Button */}
          <button
            type="button"
            onClick={() => addModule(milestoneIndex)}
            className="mt-3 px-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add Module
          </button>
        </div>
      ))}

      {/* Add Milestone Button */}
      <button
        type="button"
        onClick={addMilestone}
        className="mt-4 px-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
      >
        Add Milestone
      </button>

      {/* Submit Course Button */}
      <button
        type="button"
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit Course
      </button>
    </div>
  );
}