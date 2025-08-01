import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>📞 +359 88 888 8888</p>
          <p>📧 info@atmarhoreca.com</p>
          <p>📍 Sofia, Bulgaria</p>
        </div>
        <div className="footer-links">
          <h4>Links</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Returns & Refunds</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
