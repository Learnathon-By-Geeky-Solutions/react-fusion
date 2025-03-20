import useAuth from "@/src/context/authContext";
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (user === null) {
    //TODO:navigate
    return <>NO USER</>;
  }
  return { children };
}
