import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("https://ecradevbackend1.vercel.app/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data.message);

        setFormData({
          name: "",
          email: "",
          message: ""
        });
      } else {
        setStatus(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="section-container">

        <div className="section-heading">
          <p>GET IN TOUCH</p>
          <h2>Let's Work Together</h2>
        </div>

        <div className="contact-content">

          <div className="contact-info">
            <h3>Have a project in mind?</h3>

            <p>
              I'm open to freelance projects, collaborations,
              internships and junior software development opportunities.
            </p>

            <p>
              Let's discuss what you want to build.
            </p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Tell me about your project..."
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="btn primary"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status && (
              <p className="form-status">
                {status}
              </p>
            )}

          </form>

        </div>
      </div>
    </section>
  );
}

export default Contact;