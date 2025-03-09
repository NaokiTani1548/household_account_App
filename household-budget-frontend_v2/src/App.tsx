import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Statistics from "./pages/Statistics";
import Navigation from "./components/Sidebar";

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
        <Route path="/statistics" element={<Statistics/>} />
      </Routes>
    </Router>
  );
};

export default App;