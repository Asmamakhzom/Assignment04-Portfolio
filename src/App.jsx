import { BrowserRouter, Routes, Route, Link }from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Education from "./pages/Education";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      
        <nav className= "navbar">
          <div className="logo">
            <Link to="/">My Portfolio</Link>
          </div>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/education">Education</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <footer className="footer">
          <p>&copy; 2026 Asma Makhzom. All rights reserved.</p>

          <p>
            <a href="https://www.linkedin.com/in/asma-makhzom-123456789/" target="_blank" rel="noopener noreferrer">LinkedIn</a> |
            <a href="https://github.com/asma-makhzom" target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
        </footer>
      
    </BrowserRouter>
  );
}

export default App;
