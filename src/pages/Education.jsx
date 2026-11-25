function Education() {
    const education = [
        {
            year: "2017 - 2021",
            degree: "Bachelor of Physics",
            institution: "University of Turkey",
            details: "Specialized in theoretical physics and quantum mechanics."

        },
        {
            year: "2023 - 2025",
            degree: "General Art and Science Certificate",
            institution: "College of Ontario"
        },
        {
            year: "2025 - to date",
            degree: "Advanced Diploma in Software Engineering & AI",
            institution: "College of Ontario",
            details: "Specialized in software engineering, artificial intelligence, and machine learning."
        }
    ]

    return (
        <main className="education-page">
            <section className="education-section">
                <p className="section-label"> </p>

                <h1>My Education & Qualifications</h1>

                <p className="education-description">
                    I have a strong educational background in physics and software engineering, which has provided me with a solid foundation in both theoretical and practical aspects of technology. 
                    My academic journey has equipped me with the skills and knowledge necessary to excel in the field of web development and software design. 
                    I am committed to continuous learning and staying updated with the latest advancements in technology to deliver innovative solutions.
                </p>
                <div className="education-list">
                    {education.map((item) => (
                        <article className="education-card" key={item.degree}>
                           <div className="education-year">
                            {item.year}
                           </div>
                           
                           <div className="education-content">
                            
                            <h2>{item.degree}</h2>
                            <h3>{item.institution}</h3>
                            <p>{item.details}</p>
                           </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Education;