import { Button } from "@/components/ui/button";
import useInstructorAuth from "@/src/context/authContext"; // ✅ Correct import
import { Link, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function NavItems() {
  const { instructor, logOutInstructor } = useInstructorAuth(); // ✅ Correct hook and variable
  const location = useLocation();

  const handleLogOut = () => {
    logOutInstructor(); // ✅ Correct function
    toast.success("User Logged Out");
  };

  return (
    <div>
      <Button
        variant={location.pathname === "/" ? "default" : "outline"}
        className="ml-2"
        asChild
      >
        <Link to="/">Home</Link>
      </Button>
      
      {instructor.authenticated ? ( // ✅ Correct authentication check
        <Button
          variant={location.pathname === "/logout" ? "default" : "outline"}
          className="ml-2"
          onClick={handleLogOut}
        >
          Log Out
        </Button>
      ) : (
        <Button
          variant={location.pathname === "/login" ? "default" : "outline"}
          className="ml-2"
          asChild
        >
          <Link to="/login">Login</Link>
        </Button>
      )}

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
