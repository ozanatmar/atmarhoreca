import './Landing.css';

function Landing() {
  return (
    <div className="landing">
      <section className="landing-hero">
        <h1>Atmar Horeca</h1>
        <p>Your trusted partner in HORECA equipment.</p>
        <a href="#contact" className="cta-button">Get in Touch</a>
      </section>

      <section className="landing-about">
        <h2>What We Do</h2>
        <p>
          We supply high-quality equipment for restaurants, cafes, hotels, and catering services across Bulgaria and beyond.
          From stainless steel tools to heavy-duty cooking gear, we help professionals equip their kitchens with confidence.
        </p>
      </section>

      <section id="contact" className="landing-contact">
        <h2>Contact Us</h2>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>
    </div>
  );
}

export default Landing;