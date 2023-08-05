import logo from "./logo.svg";
import "./App.css";
import PCard from "./components/PCard"
import { useState } from "react";

function App() {
  const [password, setPassword] = useState("ahmet kaya");

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <PCard/>
    </div>
  );
}

export default App;
