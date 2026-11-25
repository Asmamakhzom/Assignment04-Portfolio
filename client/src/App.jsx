
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Education = lazy(() => import("./pages/Education"));
const Services = lazy(() => import("./pages/Services"));
const Contact = lazy(() => import("./pages/Contact"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Admin = lazy(() => import("./pages/Admin"));
const ThankYou = lazy(() => import("./pages/ThankYou"));

import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./AuthContext";

function App() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <BrowserRouter>
      <nav className="navbar">
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
          {isAuthenticated && isAdmin && (
            <Link to="/admin">Admin Dashboard</Link>
   )}

          {!isAuthenticated ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={logout}>Logout</button>
            </>
          )}
        </div>
      </nav>
       
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thank-you" element={<ThankYou />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        

        <Route path="/projects" element={<Projects />} />

        <Route path="/education" element={<Education />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>

    
      <footer className="footer">
        <p>&copy; 2026 Asma Makhzom. All rights reserved.</p>

        <p>
          <a
            href="https://www.linkedin.com/in/asma-makhzom-123456789/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          {" | "}
          <a
            href="https://github.com/asma-makhzom"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
