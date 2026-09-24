function About() {
  return (
    <section id="about" className="section about">
      <div className="section-container">

        <div className="section-heading">
          <p>GET TO KNOW ME</p>
          <h2>About Me</h2>
        </div>

        <div className="about-content">

          <div className="about-text">
            <h3>I'm Ecra, a Software Developer.</h3>

            <p>
              I am a software developer trained at Modcom Institute
              of Technology. I enjoy building websites, web applications
              and practical digital solutions.
            </p>

            <p>
              I'm currently expanding my development skills through
              hands-on projects and continuously learning new technologies.
            </p>

            <a href="#contact" className="btn primary">
              Let's Work Together
            </a>
          </div>

          <div className="about-card">
            <div>
              <strong>01</strong>
              <span>App Development</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Backend Development</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Frontend Development</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default About;