import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, FieldArray } from "formik";
import useApi from "@/src/hooks/useApi";
import { addCourse } from "@/src/services/addCourse";

export default function AddCourse() {
  const navigate = useNavigate();
  const { fetchData } = useApi();

  const initialValues = {
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    milestones: [],
  };

  const validateForm = (values) => {
    const errors = {};
    
    if (!values.title) errors.title = "Course title is required";
    if (!values.description) errors.description = "Course description is required";
    if (!values.price) errors.price = "Price is required";
    if (!values.thumbnail) errors.thumbnail = "Thumbnail URL is required";
    
    return errors;
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      const courseData = {
        ...values,
        price: Number(values.price)

      };
      
      console.log("Submitting course data:", courseData);
      
      // // Structure the data correctly according to the error you showed
      // const payload = { 
      //   data: courseData, 
      //   // instructor: { 
      //   //   token: localStorage.getItem('token'),
      //   //   authenticated: true
      //   // }
      // };

      const result = await fetchData(addCourse, courseData);
      
      if (result.success) {
        alert("Course added successfully!");
        navigate("/my-courses");
      } else {
        setStatus({ error: `Failed: ${result.message || "Unknown error"}` });
        alert(`Failed to add course: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding course:", error);
      setStatus({ error: "Failed to add course" });
      alert("Failed to add course: " + (error.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-[800px] mx-auto">
      <h1 className="text-3xl font-bold text-center">Add New Course</h1>

      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, isSubmitting, status }) => (
          <Form>
            {/* Error message if API call fails */}
            {status && status.error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4 mb-4">
                {status.error}
              </div>
            )}
            
            {/* Course Details */}
            <Field
              type="text"
              name="title"
              placeholder="Course Title"
              className="w-full p-2 border mt-4 rounded-lg"
            />
            {errors.title && touched.title && (
              <div className="text-red-500 text-sm">{errors.title}</div>
            )}

            <Field
              as="textarea"
              name="description"
              placeholder="Course Description"
              className="w-full p-2 border mt-2 rounded-lg"
            />
            {errors.description && touched.description && (
              <div className="text-red-500 text-sm">{errors.description}</div>
            )}

            <Field
              type="number"
              name="price"
              placeholder="Course Price"
              className="w-full p-2 border mt-2 rounded-lg"
            />
            {errors.price && touched.price && (
              <div className="text-red-500 text-sm">{errors.price}</div>
            )}

            <Field
              type="text"
              name="thumbnail"
              placeholder="Thumbnail URL"
              className="w-full p-2 border mt-2 rounded-lg"
            />
            {errors.thumbnail && touched.thumbnail && (
              <div className="text-red-500 text-sm">{errors.thumbnail}</div>
            )}

            {/* Milestones */}
            <FieldArray name="milestones">
              {({ push: pushMilestone, remove: removeMilestone }) => (
                <div>
                  {values.milestones.map((milestone, milestoneIndex) => (
                    <div key={milestoneIndex} className="mt-4 p-4 bg-gray-600 text-white rounded-lg">
                      <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Milestone {milestoneIndex + 1}</h2>
                        <button
                          type="button"
                          onClick={() => removeMilestone(milestoneIndex)}
                          className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition"
                        >
                          Remove
                        </button>
                      </div>

                      <Field
                        type="text"
                        name={`milestones[${milestoneIndex}].title`}
                        placeholder="Milestone Title"
                        className="w-full p-2 border mt-2 rounded-lg"
                      />

                      <Field
                        as="textarea"
                        name={`milestones[${milestoneIndex}].description`}
                        placeholder="Milestone Description"
                        className="w-full p-2 border mt-2 rounded-lg"
                      />

                      {/* Modules */}
                      <FieldArray name={`milestones[${milestoneIndex}].modules`}>
                        {({ push: pushModule, remove: removeModule }) => (
                          <div>
                            {milestone.modules && milestone.modules.map((module, moduleIndex) => (
                              <div key={moduleIndex} className="mt-2 p-3 bg-gray-400 text-black rounded-lg">
                                <div className="flex justify-between items-center">
                                  <h3 className="font-medium">Module {moduleIndex + 1}</h3>
                                  <button
                                    type="button"
                                    onClick={() => removeModule(moduleIndex)}
                                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition"
                                  >
                                    Remove
                                  </button>
                                </div>

                                <Field
                                  type="text"
                                  name={`milestones[${milestoneIndex}].modules[${moduleIndex}].title`}
                                  placeholder="Module Title"
                                  className="w-full p-2 border mt-2 rounded-lg"
                                />

                                <Field
                                  as="textarea"
                                  name={`milestones[${milestoneIndex}].modules[${moduleIndex}].description`}
                                  placeholder="Module Description"
                                  className="w-full p-2 border mt-2 rounded-lg"
                                />

                                {/* Videos Section */}
                                <div className="mt-3">
                                  <h4 className="font-medium">Videos</h4>
                                  <FieldArray name={`milestones[${milestoneIndex}].modules[${moduleIndex}].videos`}>
                                    {({ push: pushVideo, remove: removeVideo }) => (
                                      <div>
                                        {module.videos && module.videos.map((video, videoIndex) => (
                                          <div key={videoIndex} className="mt-2 p-3 bg-gray-200 text-black rounded-lg">
                                            <div className="flex justify-between items-center">
                                              <h5 className="font-medium">Video {videoIndex + 1}</h5>
                                              <button
                                                type="button"
                                                onClick={() => removeVideo(videoIndex)}
                                                className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition"
                                              >
                                                Remove
                                              </button>
                                            </div>

                                            <Field
                                              type="text"
                                              name={`milestones[${milestoneIndex}].modules[${moduleIndex}].videos[${videoIndex}].title`}
                                              placeholder="Video Title"
                                              className="w-full p-2 border mt-2 rounded-lg"
                                            />

                                            <Field
                                              type="text"
                                              name={`milestones[${milestoneIndex}].modules[${moduleIndex}].videos[${videoIndex}].url`}
                                              placeholder="Video URL"
                                              className="w-full p-2 border mt-2 rounded-lg"
                                            />

                                            <Field
                                              type="number"
                                              name={`milestones[${milestoneIndex}].modules[${moduleIndex}].videos[${videoIndex}].length`}
                                              placeholder="Video Length (e.g., 10:30)"
                                              className="w-full p-2 border mt-2 rounded-lg"
                                            />
                                          </div>
                                        ))}
                                        <button
                                          type="button"
                                          onClick={() => pushVideo({ title: "", url: "", length: "" })}
                                          className="mt-2 px-4 bg-purple-500 text-white py-1 rounded-lg hover:bg-purple-600 transition"
                                        >
                                          Add Video
                                        </button>
                                      </div>
                                    )}
                                  </FieldArray>
                                </div>

                                {/* Quiz Section */}
                                <div className="mt-3">
                                  <h4 className="font-medium">Quiz</h4>
                                  <FieldArray name={`milestones[${milestoneIndex}].modules[${moduleIndex}].quizes`}>
                                    {({ push: pushQuiz, remove: removeQuiz }) => (
                                      <div>
                                        {module.quizes && module.quizes.map((quiz, quizIndex) => (
                                          <div key={quizIndex} className="mt-2 p-3 bg-gray-200 text-black rounded-lg">
                                            <div className="flex justify-between items-center">
                                              <h5 className="font-medium">Question {quizIndex + 1}</h5>
                                              <button
                                                type="button"
                                                onClick={() => removeQuiz(quizIndex)}
                                                className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 transition"
                                              >
                                                Remove
                                              </button>
                                            </div>

                                            <Field
                                              type="text"
                                              name={`milestones[${milestoneIndex}].modules[${moduleIndex}].quizes[${quizIndex}].question`}
                                              placeholder="Question"
                                              className="w-full p-2 border mt-2 rounded-lg"
                                            />

                                            <FieldArray name={`milestones[${milestoneIndex}].modules[${moduleIndex}].quizes[${quizIndex}].options`}>
                                              {({ replace }) => (
                                                <>
                                                  {quiz.options.map((option, optionIndex) => (
                                                    <Field
                                                      key={optionIndex}
                                                      type="text"
                                                      name={`milestones[${milestoneIndex}].modules[${moduleIndex}].quizes[${quizIndex}].options[${optionIndex}]`}
                                                      placeholder={`Option ${optionIndex + 1}`}
                                                      className="w-full p-2 border mt-2 rounded-lg"
                                                    />
                                                  ))}
                                                </>
                                              )}
                                            </FieldArray>

                                            <Field
                                              type="text"
                                              name={`milestones[${milestoneIndex}].modules[${moduleIndex}].quizes[${quizIndex}].answer`}
                                              placeholder="Correct Answer"
                                              className="w-full p-2 border mt-2 rounded-lg"
                                            />

                                            <Field
                                              type="number"
                                              name={`milestones[${milestoneIndex}].modules[${moduleIndex}].quizes[${quizIndex}].value`}
                                              placeholder="Points"
                                              className="w-full p-2 border mt-2 rounded-lg"
                                            />
                                          </div>
                                        ))}
                                        <button
                                          type="button"
                                          onClick={() => pushQuiz({ question: "", options: ["", "", "", ""], answer: "", value: "" })}
                                          className="mt-2 px-4 bg-red-500 text-white py-1 rounded-lg hover:bg-red-600 transition"
                                        >
                                          Add Question
                                        </button>
                                      </div>
                                    )}
                                  </FieldArray>
                                </div>
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => pushModule({ title: "", description: "", videos: [], quizes: [] })}
                              className="mt-3 px-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                              Add Module
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => pushMilestone({ title: "", description: "", modules: [] })}
                    className="mt-4 px-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Add Milestone
                  </button>
                </div>
              )}
            </FieldArray>

            {/* Submit Course Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Submit Course"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}