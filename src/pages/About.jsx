import { Link } from "react-router-dom";

function About() {
    return (
       <main className="about-page">
        <section className="about-section">
            <div className="profile-placeholder">
                
              </div>
                
                <div className="about-content">
                   

                    <h1>Asma Makhzom</h1>
                    <h2>Web Developer and Software Designer</h2>

                <br></br>

                <p>
                    I am a passionate web developer and software designer with a strong background in creating innovation and user-friendly digital experiences.
                     I specialize in front-end and back-end development, utilizing the latest technoloies to build responsive and visually appealing websites. 
                </p>   
                 <br></br>
                 
                 <p>My goal is to deliver high-quality solutions that meet the needs of clients and users alike.
                     Explore my portfolio to see some of my work and feel free to reach out for collaboration or inquiries.
                </p>
                <br></br>
                
                <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn primary-btn"
            >
                View My Resume
            </a>
            </div>
        </section>
       </main>
    );
}

export default About;