import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="justify-items-center">
        <img src={reactLogo} className="logo react" alt="React logo" />
        <h1>REACT FUSION</h1>
      </div>
    </>
  );
}

export default App;
