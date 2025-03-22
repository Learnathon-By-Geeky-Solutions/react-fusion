import "./App.css";
import Footer from "./components/footer/Footer";
import NavBar from "./components/navBar/NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <NavBar />
      <div>
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
}

export default App;
