import { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://https://ecradevbackend1.vercel.app/api/projects")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        return response.json();
      })
      .then((data) => {
        setProjects(data.projects);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load projects.");
        setLoading(false);
      });
  }, []);

  return (
    <section id="projects" className="section projects">
      <div className="section-container">

        <div className="section-heading">
          <p>MY WORK</p>
          <h2>Featured Projects</h2>
        </div>

        {loading && (
          <p className="projects-status">
            Loading projects...
          </p>
        )}

        {error && (
          <p className="projects-status">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="projects-grid">

            {projects.map((project) => (
              <article className="project-card" key={project.id}>

                <div className="project-image">
                  <span>{project.title}</span>
                </div>

                <div className="project-content">

                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <div className="project-technologies">
                    {project.technologies.map((technology) => (
                      <span key={technology}>
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>

                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>

                  </div>

                </div>

              </article>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default Projects;