import { BACKEND } from "../constants";

export async function addCourse(courseData) {
  try {
    const result = await fetch(`${BACKEND}/course/add-course`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    });

    const data = await result.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error adding course:", error);
    return { success: false };
  }
}
