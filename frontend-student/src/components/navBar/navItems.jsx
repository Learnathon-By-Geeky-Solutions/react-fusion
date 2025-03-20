import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export default function NavItems() {
  const location = useLocation();

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
      <Button
        variant={location.pathname === "/login" ? "default" : "outline"}
        className="ml-2"
        asChild
      >
        <Link to="/login">Login</Link>
      </Button>
    </div>
  );
}
