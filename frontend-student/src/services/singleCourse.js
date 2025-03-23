import { BACKEND } from "../constants";

async function getSingleCourse(courseId) {
    try {
        const response = await fetch(`${BACKEND}/course/${courseId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching course: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching course details:", error);
        return null;
    }
}

export default getSingleCourse;
