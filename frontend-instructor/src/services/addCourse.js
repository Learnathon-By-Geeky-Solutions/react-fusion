import { BACKEND } from "../constants";

export async function addCourse(courseData) {
  console.log("Naim ", courseData);
  try {
    const result = await fetch(`${BACKEND}/course/create`, {
      method: "POST",
      headers: {
        Authorization: courseData.instructor.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData.data.data),
    });

    const data = await result.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error adding course:", error);
    return { success: false };
  }
}
