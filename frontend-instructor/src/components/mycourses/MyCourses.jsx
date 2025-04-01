import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/src/context/authContext";

function MyCourses() {
  const { instructor } = useAuth(); 

  if (!instructor.authenticated) {
    return <Navigate to="/" replace />;
  }

  return <div>MyCourses</div>;
}

export default MyCourses;
