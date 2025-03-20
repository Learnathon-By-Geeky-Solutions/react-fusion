import "./App.css";
import NavBar from "./components/navBar/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
