import { Link, useLocation } from "react-router-dom";
import { toast, Toaster } from "sonner";
import useInstructorAuth from "@/src/context/authContext";

export default function NavItems() {
  const { instructor, logOutInstructor } = useInstructorAuth();
  const location = useLocation();

  const handleLogOut = () => {
    logOutInstructor();
    toast.success("User Logged Out");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex items-center space-x-2">
      {instructor.authenticated && (
        <>
          <Link
            to="/dashboard"
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              isActive("/dashboard") ? "bg-blue-600 text-white" : "bg-gray-800 text-white"
            } hover:bg-gray-700`}
          >
            Dashboard
          </Link>

          <Link
            to="/my-courses"
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              isActive("/my-courses") ? "bg-blue-600 text-white" : "bg-gray-800 text-white"
            } hover:bg-gray-700`}
          >
            My Courses
          </Link>

          <button
            onClick={handleLogOut}
            className="px-4 py-2 rounded-md text-sm font-medium transition-all bg-red-600 text-white hover:bg-red-500"
          >
            Log Out
          </button>
        </>
      )}

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
