import { Col, Container, Row } from 'react-bootstrap'
import "../Styles/Section.scss"
import "../Styles/Review.scss"
import { Link } from 'react-router-dom';

export const Footer = () => {

const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    company: [
      { name: "О нас", link: "/about" },
      { name: "Контакты", link: "/contacts" },
      { name: "Вакансии", link: "/careers" },
      { name: "Блог", link: "/blog" }
    ],
    help: [
      { name: "Доставка и оплата", link: "/delivery" },
      { name: "Возврат товара", link: "/returns" },
      { name: "FAQ", link: "/faq" },
      { name: "Поддержка", link: "/support" }
    ],
    legal: [
      { name: "Политика конфиденциальности", link: "/privacy" },
      { name: "Пользовательское соглашение", link: "/terms" },
      { name: "Оферта", link: "/offer" }
    ]
  };

  const socialLinks = [
    { icon: "📘", name: "Facebook", link: "https://facebook.com" },
    { icon: "📸", name: "Instagram", link: "https://instagram.com" },
    { icon: "🐦", name: "Twitter", link: "https://twitter.com" },
    { icon: "💬", name: "Telegram", link: "https://telegram.org" },
    { icon: "🎵", name: "TikTok", link: "https://tiktok.com" }
  ];

  const paymentMethods = [
    "💳 Visa",
    "💳 Mastercard",
    "🟡 Mir",
    "📱 SBP",
    "🍎 Apple Pay",
    "🤖 Google Pay"
  ];

  return (
    <footer className="footer-modern">
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>
      
      <div className="footer-content">
        <Container>
          <Row className="gy-4">
            {/* Бренд и описание */}
            <Col lg={4} md={6} className="footer-brand-section">
              <div className="brand-wrapper">
                <div className="brand-icon">🍽️</div>
                <h3 className="brand-name">NAME</h3>
              </div>
              <p className="brand-description">
                Доставляем вкусную еду уже более 10 лет. 
                Готовим с любовью из свежих продуктов.
              </p>
              <div className="brand-stats">
                <div className="stat">
                  <span className="stat-number">10k+</span>
                  <span className="stat-text">Клиентов</span>
                </div>
                <div className="stat">
                  <span className="stat-number">50+</span>
                  <span className="stat-text">Блюд</span>
                </div>
                <div className="stat">
                  <span className="stat-number">4.9★</span>
                  <span className="stat-text">Рейтинг</span>
                </div>
              </div>
            </Col>

            {/* Ссылки */}
            <Col lg={2} md={6} sm={6}>
              <div className="footer-section">
                <h4 className="section-title">Компания</h4>
                <ul className="footer-links">
                  {footerLinks.company.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link} className="footer-link">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>

            <Col lg={2} md={6} sm={6}>
              <div className="footer-section">
                <h4 className="section-title">Помощь</h4>
                <ul className="footer-links">
                  {footerLinks.help.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link} className="footer-link">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div className="footer-section">
                <h4 className="section-title">Подписка на новости</h4>
                <p className="newsletter-text">
                  Получайте первыми информацию об акциях и новинках
                </p>
                <div className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Ваш email" 
                    className="newsletter-input"
                  />
                  <button className="newsletter-btn">
                    Подписаться
                  </button>
                </div>
                
                <div className="social-links">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      aria-label={social.name}
                    >
                      <span className="social-icon">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Col>
          </Row>

          <hr className="footer-divider" />

          <Row className="footer-bottom">
            <Col md={6}>
              <div className="payment-methods">
                {paymentMethods.map((method, index) => (
                  <span key={index} className="payment-badge">
                    {method}
                  </span>
                ))}
              </div>
            </Col>
            <Col md={6}>
              <div className="copyright">
                <p>© {currentYear} NAME. Все права защищены.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};