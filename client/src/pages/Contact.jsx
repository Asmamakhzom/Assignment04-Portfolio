
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          firstname: formData.firstName,
          lastname: formData.lastName,
          phone: formData.phone,
          email: formData.email,
          message: formData.message
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not send your message.");
      }

      navigate("/thank-you");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="contact-page">
      <section className="contact-section">
        <div className="contact-placeholder">
          <p className="section-label"></p>
        </div>

        <h1>Contact Me</h1>

        <p>
          If you have any questions, inquiries, or would like to collaborate
          on a project, please feel free to reach out to me using the contact
          form below. I look forward to hearing from you!
        </p>

        <div className="contact-details">
          <p>
            You can also reach me via email at{" "}
            <a href="mailto:amakhzom@email.com">amakhzom@email.com</a>
          </p>

          <p>
            Or give me a call at{" "}
            <a href="tel:+555333444">+1 (234) 567-890</a>
          </p>

          <p>
            <strong>Address:</strong> 123 Main Street, Kitchener, Ontario, Canada
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Contact;
