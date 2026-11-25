function Projects() {
    const projects = [
        {
            title: "Online store website",
            description: "A responsive e-commerce website built with React and Node.js"
        },
        {
            title: "Personal portfolio website",
            description: "A responsive portfolio website built with React"
        }
    ];

    return (
        <main className="projects-page">
            <section className="projects-section">

                <h1>My Projects</h1>

                <p className="projects-intro">Explore some of my recent projects.</p>

                <div className="projects-grid">
                    {projects.map(project => (
                        <div key={project.title} className="project-card">
                            <h2>{project.title}</h2>
                            <p>{project.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Projects;