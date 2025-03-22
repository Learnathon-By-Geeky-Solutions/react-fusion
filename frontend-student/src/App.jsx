import "./App.css";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navBar/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="grow shrink-0 basis-auto">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
}

export default App;
