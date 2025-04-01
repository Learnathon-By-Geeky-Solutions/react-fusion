import useAuth from "../../context/authContext";
import { Link, useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function NavItems() {
  const { user, logOutUser } = useAuth();
  const location = useLocation();

  const handleLogOut = () => {
    logOutUser();
    toast.success("User Logged Out");
  };

  return (
    <div className="flex space-x-2">
      <button
        className={`${
          location.pathname === "/" ? "bg-blue-600 text-white" : "bg-transparent text-blue-600"
        } py-2 px-4 rounded-md border border-blue-600 hover:bg-blue-600 hover:text-white transition duration-200`}
      >
        <Link to="/">Home</Link>
      </button>

      <button
        className={`${
          location.pathname === "/courses" ? "bg-blue-600 text-white" : "bg-transparent text-blue-600"
        } py-2 px-4 rounded-md border border-blue-600 hover:bg-blue-600 hover:text-white transition duration-200`}
      >
        <Link to="/courses">Courses</Link>
      </button>

      {user.authenticated ? (
        <button
          className={`${
            location.pathname === "/logout" ? "bg-blue-600 text-white" : "bg-transparent text-blue-600"
          } py-2 px-4 rounded-md border border-blue-600 hover:bg-blue-600 hover:text-white transition duration-200`}
          onClick={handleLogOut}
        >
          Log Out
        </button>
      ) : (
        <button
          className={`${
            location.pathname === "/login" ? "bg-blue-600 text-white" : "bg-transparent text-blue-600"
          } py-2 px-4 rounded-md border border-blue-600 hover:bg-blue-600 hover:text-white transition duration-200`}
        >
          <Link to="/login">Login</Link>
        </button>
      )}
    </div>
  );
}
