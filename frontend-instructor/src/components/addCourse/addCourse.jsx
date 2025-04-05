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

  const addMilestone = () => {
    setCourse({
      ...course,
      milestones: [...course.milestones, { title: "", description: "", items: [] }], //object?
    });
  };

  const addModule = (milestoneIndex) => {
    const updatedMilestones = [...course.milestones];
    updatedMilestones[milestoneIndex].items.push({
      type: "module",
      title: "",
      description: "",
      items: [],
      videoCount: 0,
      quizCount: 0,
    }
    );
    setCourse({ ...course, milestones: updatedMilestones });
  };

  const addVideo = (milestoneIndex, moduleIndex) => {
    const updatedMilestones = [...course.milestones];

    // Ensure that the module has a video count tracker
    const module = updatedMilestones[milestoneIndex].items[moduleIndex];

    // Add the video only if videos exist in the module
    if (!module.videos) {
      module.videos = [];
    }

    if (module.videoCount === undefined) {
      module.videoCount = 0;
    }

    // Increment the video count separately for each module
    module.videoCount += 1;

    // Add the video item
    module.items.push({
      type: "video",
      title: "",
      url: "",
      length: "",
    });

    setCourse({ ...course, milestones: updatedMilestones });
  };

  const addQuiz = (milestoneIndex, moduleIndex) => {
    const updatedMilestones = [...course.milestones];

    // Ensure that the module has a quiz count tracker
    const module = updatedMilestones[milestoneIndex].items[moduleIndex];

    // Add the quiz only if quizzes exist in the module
    if (!module.quizzes) {
      module.quizzes = [];
    }

    if (module.quizCount === undefined) {
      module.quizCount = 0;
    }

    // Increment the quiz count separately for each module
    module.quizCount += 1;

    // Add the quiz item
    module.items.push({
      type: "quiz",
      title: `Quiz ${module.quizCount}`,
      questions: [],
    });

    setCourse({ ...course, milestones: updatedMilestones });
  };

  const addQuestion = (milestoneIndex, moduleIndex, quizIndex) => {
    const updatedMilestones = [...course.milestones];

    // Ensure the quizzes array exists for the specific module
    if (!updatedMilestones[milestoneIndex].items[moduleIndex].items[quizIndex].questions) {
      updatedMilestones[milestoneIndex].items[moduleIndex].items[quizIndex].questions = [];
    }

    // Add a new question to the quiz
    updatedMilestones[milestoneIndex].items[moduleIndex].items[quizIndex].questions.push({
      question: "",
      options: ["", "", "", ""],
      answer: "",
      points: "",
    });

    // Update the course state
    setCourse({ ...course, milestones: updatedMilestones });
  };

  const handleInputChange = (e, path) => {
    const updatedCourse = { ...course };
    let ref = updatedCourse;
    const keys = path.split(".");
    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        ref[key] = e.target.value;
      } else {
        ref = ref[key];
      }
    });
    setCourse(updatedCourse);
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
            onChange={(e) => handleInputChange(e, `milestones.${milestoneIndex}.title`)}
            className="w-full p-2 border mt-2 rounded-lg"
          />
          <textarea
            placeholder="Milestone Description"
            value={milestone.description}
            onChange={(e) => handleInputChange(e, `milestones.${milestoneIndex}.description`)}
            className="w-full p-2 border mt-2 rounded-lg"
          />

          {/* Modules & Quizzes List */}
          {milestone.items.map((item, itemIndex) => (
            <div key={itemIndex} className="mt-2 p-3 bg-gray-600 text-black rounded-lg">
              <h3 className="font-medium">
                {item.type === "module"
                  ? `Module ${course.milestones[milestoneIndex].items.filter(i => i.type === "module").indexOf(item) + 1}`
                  : item.title}
              </h3>


              {/* Module Content */}
              {item.type === "module" && (
                <>
                  {(() => {
                    let videoCount = 0;
                    let quizCount = 0;

                    return item.items.map((content, contentIndex) => {
                      if (content.type === "video") videoCount++;
                      if (content.type === "quiz") quizCount++;

                      return (
                        <div key={contentIndex} className="mt-2 p-3 bg-gray-200 text-black rounded-lg">
                          {content.type === "video" && (
                            <>
                              <h4 className="font-medium">Video {videoCount}</h4>
                              <input
                                type="text"
                                placeholder="Video Title"
                                value={content.title}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    `milestones.${milestoneIndex}.items.${itemIndex}.items.${contentIndex}.title`
                                  )
                                }
                                className="w-full p-2 border mt-2 rounded-lg"
                              />
                              <input
                                type="text"
                                placeholder="Video URL"
                                value={content.url}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    `milestones.${milestoneIndex}.items.${itemIndex}.items.${contentIndex}.url`
                                  )
                                }
                                className="w-full p-2 border mt-2 rounded-lg"
                              />
                              <input
                                type="text"
                                placeholder="Video Length"
                                value={content.length}
                                onChange={(e) =>
                                  handleInputChange(
                                    e,
                                    `milestones.${milestoneIndex}.items.${itemIndex}.items.${contentIndex}.length`
                                  )
                                }
                                className="w-full p-2 border mt-2 rounded-lg"
                              />
                            </>
                          )}

                          {content.type === "quiz" && (
                            <>
                              <h4 className="font-medium">Quiz {quizCount}</h4>
                              {content.questions.map((question, questionIndex) => (
                                <div key={questionIndex} className="mt-2 p-3 border rounded-lg">
                                  <h5 className="font-medium">Question {questionIndex + 1}</h5>
                                  <input
                                    type="text"
                                    placeholder="Question"
                                    value={question.question}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        `milestones.${milestoneIndex}.items.${itemIndex}.items.${contentIndex}.questions.${questionIndex}.question`
                                      )
                                    }
                                    className="w-full p-2 border mt-2 rounded-lg"
                                  />
                                  {question.options.map((option, optionIndex) => (
                                    <input
                                      key={optionIndex}
                                      type="text"
                                      placeholder={`Option ${optionIndex + 1}`}
                                      value={option}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          `milestones.${milestoneIndex}.items.${itemIndex}.items.${contentIndex}.questions.${questionIndex}.options.${optionIndex}`
                                        )
                                      }
                                      className="w-full p-2 border mt-2 rounded-lg"
                                    />
                                  ))}
                                  <input
                                    type="text"
                                    placeholder="Correct Answer"
                                    value={question.answer}
                                    onChange={(e) =>
                                      handleInputChange(
                                        e,
                                        `milestones.${milestoneIndex}.items.${itemIndex}.items.${contentIndex}.questions.${questionIndex}.answer`
                                      )
                                    }
                                    className="w-full p-2 border mt-2 rounded-lg"
                                  />
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => addQuestion(milestoneIndex, itemIndex, contentIndex)}
                                className="px-4 bg-red-500 text-white py-1 rounded-lg hover:bg-red-600 transition mt-2"
                              >
                                Add Question
                              </button>
                            </>
                          )}
                        </div>
                      );
                    });
                  })()}

                  {/* Add Buttons */}
                  <div className="flex gap-4 mt-2">
                    <button
                      type="button"
                      onClick={() => addVideo(milestoneIndex, itemIndex)}
                      className="px-4 bg-purple-500 text-white py-1 rounded-lg hover:bg-purple-600 transition"
                    >
                      Add Video
                    </button>
                    <button
                      type="button"
                      onClick={() => addQuiz(milestoneIndex, itemIndex)}
                      className="px-4 bg-yellow-500 text-white py-1 rounded-lg hover:bg-yellow-600 transition"
                    >
                      Add Quiz
                    </button>
                  </div>
                </>
              )}



            </div>
          ))}

          {/* Add Module Buttons */}
          <button
            type="button"
            onClick={() => addModule(milestoneIndex)}
            className="px-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition mt-2"
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
