function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-content">

        <p className="hero-small">HELLO, I'M</p>

        <h1>
          Ecra
          <span>Software Developer</span>
        </h1>

        <p className="hero-description">
          I build responsive websites, web applications, APIs
          and digital solutions using modern technologies.
        </p>

        <div className="hero-buttons">
          <a href="#projects" className="btn primary">
            View My Work
          </a>

          <a href="#contact" className="btn secondary">
            Contact Me
          </a>
        </div>

      </div>
    </section>
  );
}

export default Hero;