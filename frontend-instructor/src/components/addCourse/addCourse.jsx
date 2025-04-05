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
      items: []
    }
    );
    setCourse({ ...course, milestones: updatedMilestones });
  };

  const addVideo = (milestoneIndex, moduleIndex) => {
    const updatedMilestones = [...course.milestones];

    if (!updatedMilestones[milestoneIndex].items[moduleIndex].videos) {
      updatedMilestones[milestoneIndex].items[moduleIndex].videos = [];
    }

    updatedMilestones[milestoneIndex].items[moduleIndex].videos.push({
      type: "video",
      title: "",
      url: "",
    });

    setCourse({ ...course, milestones: updatedMilestones });
  };

  const addQuiz = (milestoneIndex, moduleIndex) => {
    const updatedMilestones = [...course.milestones];

    if (!updatedMilestones[milestoneIndex].items[moduleIndex].quizzes) {
      updatedMilestones[milestoneIndex].items[moduleIndex].quizzes = [];
    }

    updatedMilestones[milestoneIndex].items[moduleIndex].quizzes.push({
      type: "quiz",
      title: `Quiz ${updatedMilestones[milestoneIndex].items[moduleIndex].quizzes.length + 1}`,
      questions: [],
    });

    setCourse({ ...course, milestones: updatedMilestones });
  };



  const addQuestion = (milestoneIndex, moduleIndex, quizIndex) => {
    const updatedMilestones = [...course.milestones];

    // Ensure quizzes array exists
    if (!updatedMilestones[milestoneIndex].items[moduleIndex].quizzes) {
      updatedMilestones[milestoneIndex].items[moduleIndex].quizzes = [];
    }

    // Ensure questions array exists inside the specific quiz
    if (!updatedMilestones[milestoneIndex].items[moduleIndex].quizzes[quizIndex].questions) {
      updatedMilestones[milestoneIndex].items[moduleIndex].quizzes[quizIndex].questions = [];
    }

    // Add new question to the quiz
    updatedMilestones[milestoneIndex].items[moduleIndex].quizzes[quizIndex].questions.push({
      question: "",
      options: ["", "", "", ""],
      answer: "",
      points: "",
    });

    // Update state
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
        <div key={milestoneIndex} className="mt-4 p-4 border rounded-lg">
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
            <div key={itemIndex} className="mt-2 p-3 border rounded-lg">
              <h3 className="font-medium">
                {item.type === "module"
                  ? `Module ${course.milestones[milestoneIndex].items.filter(i => i.type === "module").indexOf(item) + 1}`
                  : item.title}
              </h3>


              {/* Module Content */}
              {item.type === "module" && (
                <>
                  {item.items.map((content, contentIndex) => (
                    <div key={contentIndex} className="mt-2 p-3 border rounded-lg">
                      {content.type === "video" ? (
                        <>
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
                            className="w-1/2 p-2 border rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="YouTube URL"
                            value={content.url}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                `milestones.${milestoneIndex}.items.${itemIndex}.items.${contentIndex}.url`
                              )
                            }
                            className="w-1/2 p-2 border rounded-lg"
                          />
                        </>
                      ) : content.type === "quiz" ? (
                        <>
                          <h3 className="font-medium">{content.title}</h3>
                          {content.questions.map((question, questionIndex) => (
                            <div key={questionIndex} className="mt-2 p-3 border rounded-lg">
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
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => addQuestion(milestoneIndex, moduleIndex, contentIndex)}
                            className="px-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition mt-2"
                          >
                            Add Question
                          </button>
                        </>
                      ) : null}
                    </div>
                  ))}

                </>
              )}

              {/* Quiz Content */}
              {item.type === "quiz" && (
                <div>
                  {item.questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="mt-2 p-3 border rounded-lg">
                      <input
                        type="text"
                        placeholder="Question"
                        value={question.question}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            `milestones.${milestoneIndex}.items.${itemIndex}.questions.${questionIndex}.question`
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
                              `milestones.${milestoneIndex}.items.${itemIndex}.questions.${questionIndex}.options.${optionIndex}`
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
                            `milestones.${milestoneIndex}.items.${itemIndex}.questions.${questionIndex}.answer`
                          )
                        }
                        className="w-full p-2 border mt-2 rounded-lg"
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addQuestion(milestoneIndex, itemIndex)}
                    className="px-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition mt-2"
                  >
                    Add Question
                  </button>

                </div>
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
