function Services() {
    const services = [
        {
            title: "Web Development",
            description: " I offer web development services, including front-end and back-end development, using modern technology stacks to create responsive and visually appealing websites."
        },
        {
            title: "UI/UX Design",
            description: "I provide UI/UX design services, focusing on creating intuitive and user-friendly interfaces that enhance the overall user experience."
        },
        
    ];

    return (
        <main className="services-page">
            <section className="services-section">

                <h1>My Services</h1>
                <p className="services-intro">
                    I offer a range of services in web development and UI/UX design. 
                    My goal is to create innovative and user-friendly digital experiences that meet the needs of clients and users alike.
                </p>
                <div className="services-list">
                    {services.map((service) => (
                        <article className="service-card" key={service.title}>
                            <h2>{service.title}</h2>
                            <p>{service.description}</p>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );


}

export default Services;