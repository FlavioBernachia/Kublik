import React from 'react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'; // Importar íconos

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Sección izquierda */}
        <div className="footer-logo">
          <img src="/logoKublik.png" alt="Kublik Logo" className="logo-image" />
          <h2>Kublik Everywear</h2>
        </div>

        {/* Sección central */}
        <div className="footer-links">
          <div className="footer-section">
            <h3>Sobre Nosotros</h3>
            <p>
              En Kublik Everywear ofrecemos las mejores prendas y accesorios para reflejar tu
              estilo único. Nos enorgullecemos de ofrecer calidad y diseño.
            </p>
          </div>
          <div className="footer-section">
            <h3>Contacto</h3>
            <p>Email: contacto@kublik.com</p>
            <p>Teléfono: +34 600 123 456</p>
          </div>
        </div>

        {/* Sección derecha */}
        <div className="footer-socials">
          <h3>Síguenos</h3>
          <div className="social-icons">
            <a
              href="https://wa.me/34600123456"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={40} />
            </a>
            <a
              href="https://www.instagram.com/kublik"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Instagram"
            >
              <FaInstagram size={40} />
            </a>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="footer-bottom">
        <p>&copy; 2024 Kublik Everywear. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;