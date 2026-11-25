
import { Link } from "react-router-dom";

function ThankYou() {
  return (
    <main className="thank-you-page">
      <section>
        <h1>Thank You!</h1>
        <p>
          Your message has been sent successfully.
          I will get back to you soon.
        </p>
        <Link to="/">Return to Home</Link>
      </section>
    </main>
  );
}

export default ThankYou;
