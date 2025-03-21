import "./App.css";
import NavBar from "./components/navBar/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <NavBar></NavBar>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default App;
