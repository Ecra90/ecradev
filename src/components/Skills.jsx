function Skills() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Python",
    "Flask",
    "REST APIs",
    "SQLite",
    "Git",
    "GitHub",
    "M-Pesa Integration",
    "Responsive Design"
  ];

  return (
    <section id="skills" className="section skills">
      <div className="section-container">

        <div className="section-heading">
          <p>WHAT I USE</p>
          <h2>My Skills</h2>
        </div>

        <div className="skills-grid">
          {skills.map((skill) => (
            <div className="skill-card" key={skill}>
              {skill}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;