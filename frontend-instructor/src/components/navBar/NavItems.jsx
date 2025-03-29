import useInstructorAuth from "@/src/context/authContext";
import { toast, Toaster } from "sonner";

export default function NavItems() {
  const { instructor, logOutInstructor } = useInstructorAuth();

  const handleLogOut = () => {
    logOutInstructor();
    toast.success("User Logged Out");
  };

  return (
    <div className="flex items-center space-x-2">
      {instructor.authenticated && (
        <button
          onClick={handleLogOut}
          className="px-4 py-2 rounded-md text-sm font-medium transition-all bg-blue-600 text-white"
        >
          Log Out
        </button>
      )}

      <Toaster position="bottom-right" richColors />
    </div>
  );
}
