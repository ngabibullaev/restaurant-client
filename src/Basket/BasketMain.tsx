import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export const BasketMain = () => {
    return (
        <div className="basket-promo-section">
            <div className="promo-card">
                <Row className="promo-row align-items-center">
                    <Col lg={5} md={12} className="promo-image-col">
                        <div className="image-wrapper">
                            <div className="image-glow"></div>
                            <img 
                                className="promo-image" 
                                src="https://media.dodostatic.net/image/r:292x292/0198bf589106736aa2016b8d2dbeca55.jpg" 
                                alt="Соедини половинки"
                            />
                            <div className="image-badge">
                                <span>🔥 Хит</span>
                            </div>
                        </div>
                    </Col>
                    
                    <Col lg={7} md={12} className="promo-content-col">
                        <div className="promo-content">
                            <div className="promo-tag">
                                <span className="tag-icon">🎉</span>
                                <span>Специальное предложение</span>
                            </div>
                            
                            <h2 className="promo-title">
                                Соедини <span className="highlight">половинки</span>
                            </h2>
                            
                            <p className="promo-description">
                                попробуй сразу две пиццы по одной цене
                            </p>
                            
                            <div className="promo-features">
                                <div className="feature">
                                    <span className="feature-icon">🍕</span>
                                    <span>2 вкуса в 1 пицце</span>
                                </div>
                                <div className="feature">
                                    <span className="feature-icon">💰</span>
                                    <span>Экономия до 30%</span>
                                </div>
                                <div className="feature">
                                    <span className="feature-icon">⚡</span>
                                    <span>Бесплатная доставка</span>
                                </div>
                            </div>
                            
                            <Link to="/two" className="promo-link">
                                <Button className="promo-btn">
                                    <nav>Попробовать</nav>
                                    <svg viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </Button>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};