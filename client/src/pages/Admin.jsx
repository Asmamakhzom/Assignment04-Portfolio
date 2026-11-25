
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

function Admin() {
  const { token } = useAuth();

  const [activeType, setActiveType] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    title: "",
    firstname: "",
    lastname: "",
    email: "",
    completion: "",
    description: ""
  };

  const [form, setForm] = useState(emptyForm);

  const endpoint =
    activeType === "projects"
      ? "http://localhost:3000/api/projects"
      : "http://localhost:3000/api/qualifications";

  const loadRecords = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [projectResponse, educationResponse] = await Promise.all([
        fetch("http://localhost:3000/api/projects", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("http://localhost:3000/api/qualifications", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const projectData = await projectResponse.json();
      const educationData = await educationResponse.json();

      if (!projectResponse.ok || !educationResponse.ok) {
        throw new Error("Could not load records.");
      }

      setProjects(projectData);
      setEducation(educationData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const record = {
      ...form,
      completion: form.completion || undefined
    };

    try {
      const response = await fetch(
        editingId ? `${endpoint}/${editingId}` : endpoint,
        {
          method: editingId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(record)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not save record.");
      }

      setMessage(editingId ? "Record updated successfully." : "Record added successfully.");
      setForm(emptyForm);
      setEditingId(null);
      await loadRecords();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title || "",
      firstname: item.firstname || "",
      lastname: item.lastname || "",
      email: item.email || "",
      completion: item.completion
        ? new Date(item.completion).toISOString().split("T")[0]
        : "",
      description: item.description || ""
    });

    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) {
      return;
    }

    setError("");
    setMessage("");

    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete record.");
      }

      setMessage("Record deleted successfully.");
      await loadRecords();
    } catch (err) {
      setError(err.message);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setMessage("");
  };

  const records = activeType === "projects" ? projects : education;

  return (
    <main className="admin-page">
      <section className="admin-section">
        <h1>Admin Dashboard</h1>
        <p>Manage your portfolio projects and education records.</p>

        
<div className="admin-tabs">
  <button
    type="button"
    className={activeType === "projects" ? "active" : ""}
    onClick={() => {
      setActiveType("projects");
      cancelEdit();
    }}
  >
    Manage Projects
  </button>

  <button
    type="button"
    className={activeType === "education" ? "active" : ""}
    onClick={() => {
      setActiveType("education");
      cancelEdit();
    }}
  >
    Manage Education
  </button>
</div>


        <h2>{editingId ? "Edit Record" : "Add New Record"}</h2>

        <form onSubmit={handleSubmit} className="admin-form">
          <label>Title / Degree</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <label>First Name</label>
          <input
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            required
          />

          <label>Last Name</label>
          <input
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Completion Date (optional)</label>
          <input
            type="date"
            name="completion"
            value={form.completion}
            onChange={handleChange}
          />

          <label>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {editingId ? "Update Record" : "Add Record"}
          </button>

          {editingId && (
            <button type="button" onClick={cancelEdit}>
              Cancel Edit
            </button>
          )}
        </form>

        {message && <p>{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <h2>Existing Records</h2>

        {loading && <p>Loading records...</p>}

        {!loading && records.length === 0 && (
          <p>No records found.</p>
        )}

        <div className="admin-records">
          {records.map((item) => (
            <article key={item._id} className="admin-record">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>{item.firstname} {item.lastname}</p>
              <p>{item.email}</p>

              <button type="button" onClick={() => handleEdit(item)}>
                Edit
              </button>

              <button type="button" onClick={() => handleDelete(item._id)}>
                Delete
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Admin;
