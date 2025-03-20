import "./App.css";
import NavBar from "./components/navBar/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="bg-gray-100">
      <NavBar></NavBar>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
