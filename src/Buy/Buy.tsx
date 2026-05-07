import React, { useState } from "react";
import { Button, ButtonGroup, Col, Container, FloatingLabel, Form, Row, Alert } from 'react-bootstrap';
import "../Styles/Buy.scss";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

export const Buy: React.FC = () => {

  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const text = items.map((item) => '\n' + (item.nameResult || item.name) + ' - ' + item.count + 'шт').join('');

  const [active, setActive] = useState(false)
  const [show, setShow] = useState(false);

  const [isName, setIsName] = useState('')
  const [number, setNumber] = useState('')
  const [region, setRegion] = useState('')
  const [home, setHome] = useState('')
  const [house, setHouse] = useState('')
  const [floor, setFloor] = useState('')
  const [apartment, setApartment] = useState('')
  const [comment, setComment] = useState('')

  const [nameError, setNameError] = useState('')
  const [numberError, setNumberError] = useState('')
  const [regionError, setRegionError] = useState('')
  const [homeError, setHomeError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let data = {};

    if (active === false) {
      setNameError('')
      setNumberError('')
      if (isName.trim() === '') {
        setNameError('Заполните обязательное поле')
        return;
      }
      if (!/^\d{9,}$/.test(number)) {
        setNumberError('Номер телефона должен содержать не менее 9 цифр')
        return;
      }
      data = {
        isName,
        number,
        region: region || '(Не указан)',
        home: home || '(Не указан)',
        house: house || '(Не указан)',
        floor: floor || '(Не указан)',
        apartment: apartment || '(Не указан)',
        comment: comment || '(Не указан)',
        text,
        totalPrice,
        totalCount
      };
    } else {
      setNameError('')
      setNumberError('')
      setRegionError('')
      setHomeError('')
      if (isName.trim() === '') {
        setNameError('Заполните обязательное поле')
        return;
      }
      if (!/^\d{9,}$/.test(number)) {
        setNumberError('Номер телефона должен содержать не менее 9 цифр')
        return;
      }
      if (!region.trim()) {
        setRegionError('Заполните обязательное поле')
        return;
      }
      if (!home.trim()) {
        setHomeError('Заполните обязательное поле')
        return;
      }
      data = {
        isName,
        number,
        region,
        home,
        house: house || '(Не указан)',
        floor: floor || '(Не указан)',
        apartment: apartment || '(Не указан)',
        comment: comment || '(Не указан)',
        text,
        totalPrice,
        totalCount
      };
    }

    axios.post('https://restaurant-server-ohyq.onrender.com/sendMessage', data)
      .then(response => {
        if (response.data.success) {
          console.log('Сообщение отправлено');
          setShow(true)
          setTimeout(() => {
            setShow(false);
            window.location.href = '/';
          }, 3000);
        } else {
          console.error(`Ошибка в отправке: ${response.data.error}`);
        }
      })
      .catch(error => {
        console.error(`Ошибка: ${error}`);
      });
  }

  return (
    <div className="buy-page">
      <Container className="buy-container">
        <div className="order-header">
          <div className="header-icon">📝</div>
          <h2 className="order-title">Оформление заказа</h2>
          <p className="order-subtitle">Заполните форму, и мы свяжемся с вами</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Выбор типа получения */}
          <div className="delivery-type-section">
            <Row>
              <Col lg={8} className="mx-auto">
                <div className="type-switch">
                  <ButtonGroup className="type-buttons">
                    <Button 
                      onClick={() => setActive(false)} 
                      className={`type-btn pickup-btn ${!active ? 'active' : ''}`}
                      variant={!active ? "dark" : "outline-dark"}
                    >
                      <span className="btn-icon">🏪</span>
                      <span>Самовывоз</span>
                    </Button>
                    <Button 
                      onClick={() => setActive(true)} 
                      className={`type-btn delivery-btn ${active ? 'active' : ''}`}
                      variant={active ? "dark" : "outline-dark"}
                    >
                      <span className="btn-icon">🚚</span>
                      <span>Доставка</span>
                    </Button>
                  </ButtonGroup>
                </div>
                
                {!active && (
                  <div className="pickup-info">
                    <div className="info-card">
                      <span className="info-icon">📍</span>
                      <div className="info-content">
                        <p className="info-title">Адрес заведения</p>
                        <p className="info-address">Центральная 1A</p>
                        <p className="info-worktime">Ежедневно с 10:00 до 22:00</p>
                      </div>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </div>

          {/* Информация о клиенте */}
          <div className="form-section">
            <Row>
              <Col lg={8} className="mx-auto">
                <div className="section-header">
                  <div className="section-icon">👤</div>
                  <h3 className="section-title">Клиент</h3>
                </div>

                <div className="form-group">
                  <FloatingLabel label="Имя *">
                    <Form.Control 
                      type="text" 
                      placeholder="Иван Иванов"
                      onChange={e => setIsName(e.target.value)}
                      className={`form-input ${nameError ? 'error' : ''}`}
                    />
                  </FloatingLabel>
                  {nameError && <div className="error-message">{nameError}</div>}
                </div>

                <div className="form-group">
                  <FloatingLabel label="Номер телефона *">
                    <Form.Control 
                      type="tel" 
                      placeholder="+7 999 999-99-99"
                      onChange={e => setNumber(e.target.value)}
                      className={`form-input ${numberError ? 'error' : ''}`}
                    />
                  </FloatingLabel>
                  {numberError && <div className="error-message">{numberError}</div>}
                </div>
              </Col>
            </Row>
          </div>

          {active && (
            <div className="form-section">
              <Row>
                <Col lg={8} className="mx-auto">
                  <div className="section-header">
                    <div className="section-icon">🏠</div>
                    <h3 className="section-title">Адрес доставки</h3>
                  </div>

                  <Row className="address-row">
                    <Col md={6}>
                      <div className="form-group">
                        <FloatingLabel label="Улица *">
                          <Form.Control 
                            type="text" 
                            placeholder="Ленина"
                            onChange={e => setRegion(e.target.value)}
                            className={`form-input ${regionError ? 'error' : ''}`}
                          />
                        </FloatingLabel>
                        {regionError && <div className="error-message">{regionError}</div>}
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <FloatingLabel label="Дом *">
                          <Form.Control 
                            type="text" 
                            placeholder="15"
                            onChange={e => setHome(e.target.value)}
                            className={`form-input ${homeError ? 'error' : ''}`}
                          />
                        </FloatingLabel>
                        {homeError && <div className="error-message">{homeError}</div>}
                      </div>
                    </Col>
                  </Row>

                  <Row className="address-row">
                    <Col md={6}>
                      <div className="form-group optional">
                        <FloatingLabel label="Подъезд">
                          <Form.Control 
                            type="text" 
                            placeholder="2"
                            onChange={e => setHouse(e.target.value)}
                            className="form-input"
                          />
                        </FloatingLabel>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group optional">
                        <FloatingLabel label="Этаж">
                          <Form.Control 
                            type="text" 
                            placeholder="5"
                            onChange={e => setFloor(e.target.value)}
                            className="form-input"
                          />
                        </FloatingLabel>
                      </div>
                    </Col>
                  </Row>

                  <div className="form-group optional">
                    <FloatingLabel label="Квартира">
                      <Form.Control 
                        type="text" 
                        placeholder="42"
                        onChange={e => setApartment(e.target.value)}
                        className="form-input"
                      />
                    </FloatingLabel>
                  </div>
                </Col>
              </Row>
            </div>
          )}

          <div className="form-section">
            <Row>
              <Col lg={8} className="mx-auto">
                <div className="section-header">
                  <div className="section-icon">💬</div>
                  <h3 className="section-title">Комментарий</h3>
                </div>

                <div className="form-group">
                  <FloatingLabel label="Дополнительная информация">
                    <Form.Control 
                      as="textarea"
                      placeholder="Пожелания к заказу, особые условия..."
                      style={{ height: '120px' }}
                      onChange={e => setComment(e.target.value)}
                      className="form-input textarea"
                    />
                  </FloatingLabel>
                </div>
              </Col>
            </Row>
          </div>

          <div className="order-summary">
            <Row>
              <Col lg={8} className="mx-auto">
                <div className="summary-card">
                  <div className="summary-details">
                    <div className="summary-item">
                      <span>Товаров:</span>
                      <strong>{totalCount} шт.</strong>
                    </div>
                    <div className="summary-item total">
                      <span>Итого к оплате:</span>
                      <strong className="total-price">{totalPrice} ₽</strong>
                    </div>
                  </div>
                  
                  <div className="actions-buttons">
                    <NavLink to="/basket" className="action-link">
                      <Button className="back-btn" variant="outline-dark">
                        <svg viewBox="0 0 24 24" fill="none">
                          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Назад
                      </Button>
                    </NavLink>
                    <Button onClick={handleSubmit} className="submit-btn" variant="dark">
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Заказать
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </form>

        <Alert
          show={show}
          variant="success"
          onClose={() => setShow(false)}
          dismissible
          className="success-alert"
        >
          <div className="alert-content">
            <div className="alert-icon">✅</div>
            <div className="alert-text">
              <Alert.Heading>Заказ успешно оформлен!</Alert.Heading>
              <p>Менеджер свяжется с вами в течение 5 минут</p>
            </div>
          </div>
        </Alert>
      </Container>
    </div>
  );
};