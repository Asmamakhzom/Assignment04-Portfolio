
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

function Education() {
  const { token } = useAuth();
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/qualifications",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not load education records.");
        }

        setEducation(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchEducation();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <main className="education-page">
      <section className="education-section">
        <h1>My Education & Qualifications</h1>

        <p className="education-intro">
          I have a strong educational background in physics and software
          engineering, which has provided me with a solid foundation in both
          theoretical and practical aspects of technology. My academic journey
          has equipped me with the skills and knowledge necessary to excel in
          web development and software design. I am committed to continuous
          learning and staying updated with the latest advancements in
          technology.
        </p>

        {loading && <p>Loading education records...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && education.length === 0 && (
          <p>No education records have been added yet.</p>
        )}

        <div className="education-list">
          {education.map((item) => (
            <article className="education-card" key={item._id}>
              <div className="education-year">
                {item.completion
                 ? new Date(item.completion).toLocaleDateString()
                 : "In progress"}
             </div>

              <div className="education-content">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>
                  <strong>Name:</strong> {item.firstname} {item.lastname}
               </p>
             <p>
               <strong>Email:</strong> {item.email}
             </p>
             {item.completion && (
            <p>
              <strong>Completion:</strong>{" "}
              {new Date(item.completion).toLocaleDateString()}
            </p>
      )}
    </div>
      </article>
 ))}
        </div>
      </section>
    </main>
  );
}

export default Education;
