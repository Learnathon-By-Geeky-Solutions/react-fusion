import "./App.css";
import NavBar from "./components/navBar/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <div>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
