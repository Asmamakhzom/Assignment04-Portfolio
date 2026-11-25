
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

function Projects() {
  const { token } = useAuth();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/projects", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not load projects.");
        }

        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProjects();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <main className="projects-page">
      <section className="projects-section">
        <h1>My Projects</h1>

        <p className="projects-intro">
          Explore some of my recent projects.
        </p>

        {loading && <p>Loading projects...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && projects.length === 0 && (
          <p>No projects have been added yet.</p>
        )}

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <h2>{project.title}</h2>

              <p>{project.description}</p>

              <p>
                <strong>Created by:</strong> {project.firstname} {project.lastname}
              </p>

              <p>Contact: {project.email}</p>

              {project.completion && (
                <p>
                  Completion:{" "}
                  {new Date(project.completion).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Projects;
