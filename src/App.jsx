// App.jsx
import RemoveBgComponent from "./api/RemoveBg";
import "./App.css";
import { useState } from "react";

function App() {
  const [inputLink, setInputLink] = useState("");

  const handleInputChange = (e) => {
    setInputLink(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        value={inputLink}
        placeholder="Enter Image URL"
        onChange={handleInputChange}
      />
      <RemoveBgComponent urlMilega={inputLink} /> {/* Pass urlMilega prop */}
    </>
  );
}

export default App;