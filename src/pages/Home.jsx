import { Link } from "react-router-dom";

function Home() {
    return (
       <main className="home">
        <section className="hero">
            <div className="hero-content">
                <p className="hero-intro"></p>

                <h1>Welcome to My Portfolio</h1>

                <h2>Web Developer and Software Designer</h2>

                <br></br>

                <p className="hero-description">
                    I am a passionate web developer and software designer with a strong background in creating innovation and user-friendly digital experiences.
                     I specialize in front-end and back-end development, utilizing the latest technoloies to build responsive and visually appealing websites. 
                     My goal is to deliver high-quality solutions that meet the needs of clients and users alike.
                     Explore my portfolio to see some of my work and feel free to reach out for collaboration or inquiries.
                </p>
                <br></br>
                <div className="hero-buttons">
                    <Link to="/about" className="btn primary-btn">About Me</Link>
                    <Link to="/Projects" className="btn secondary-btn">View My Projects</Link>
                </div>
            </div>
        </section>
       </main>
    );
}

export default Home;