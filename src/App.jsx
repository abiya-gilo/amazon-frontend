import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Header/Header"; // ✅ import Header once
import Routing from "./Routing";

function App() {
  return (
    <Router>
      <Routing />
    </Router>
  );
}

export default App;
