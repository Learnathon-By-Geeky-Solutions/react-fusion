import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "@/src/context/authContext";

function Dashboard() {
  const { instructor } = useAuth(); 

  if (!instructor.authenticated) {
    return <Navigate to="/" replace />;
  }

  return <div>Dashboard</div>;
}

export default Dashboard;
