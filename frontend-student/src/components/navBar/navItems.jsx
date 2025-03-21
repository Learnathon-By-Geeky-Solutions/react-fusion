import { Button } from "@/components/ui/button";
import useAuth from "@/src/context/authContext";
import { Link, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

export default function NavItems() {
  const { user, logOutUser } = useAuth();
  const location = useLocation();
  const handleLogOut = () => {
    logOutUser();
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
      <Button
        variant={location.pathname === "/courses" ? "default" : "outline"}
        className="ml-2"
        asChild
      >
        <Link to="/courses">Courses</Link>
      </Button>
      {user.authenticated ? (
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
