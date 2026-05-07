import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Button,
  Container,
  Row,
  Col,
  Image,
  ProgressBar,
} from "react-bootstrap";
import "../Styles/FullPizza.scss";
import { useDispatch } from "react-redux";
import { addItem } from "../Redux/Logic/cartSlice";

interface Pizza {
  id: string;
  imageUrl: string;
  name: string;
  title: string;
  rating: number;
  price: number;
}

export const FullPizza = () => {
  const [pizza, setPizza] = useState<Pizza>();
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(1);
  const { urlId } = useParams();

  const id = pizza?.id;
  const name = pizza?.name;
  const price = pizza?.price;
  const imageUrl = pizza?.imageUrl;

  const dispatch = useDispatch();

  const onClickAdd = () => {
    if (pizza) {
        const item = {
        id,
        name,
        price,
        imageUrl,
      };
      for (let i = 1; i <= count; i++) {
      dispatch(addItem(item));
      }
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
    async function fetchPizza() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          "https://642b35fa208dfe254714763b.mockapi.io/items/" + urlId,
        );
        setPizza(data);
      } catch (error) {
        console.log("Ошибка при получении пиццы", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPizza();
  }, [urlId]);

  if (isLoading) {
    return <PizzaSkeleton />;
  }

  if (!pizza) {
    return (
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">🍕</div>
          <h2>Пицца не найдена</h2>
          <p>К сожалению, такой пиццы нет в нашем меню</p>
          <Link to="/" className="back-home-btn">
            Вернуться на главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="full-pizza-page">
      <Container>
        <Link to="/" className="back-button">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Назад к меню
        </Link>

        <Row className="pizza-content">
          <Col lg={6} className="pizza-image-section">
            <div className="image-wrapper">
              <img
                src={pizza.imageUrl}
                alt={pizza.name}
                className="pizza-image"
              />
              <div className="rating-badge">
                <span className="rating-icon">★</span>
                <span className="rating-value">{pizza.rating}/100</span>
              </div>
            </div>
          </Col>

          <Col lg={6} className="pizza-info-section">
            <h1 className="pizza-title">{pizza.name}</h1>

            <div className="pizza-description">
              <p>{pizza.title}</p>
            </div>

            <div className="rating-section">
              <div className="rating-header">
                <span>Рейтинг пиццы</span>
                <span className="rating-number">{pizza.rating}%</span>
              </div>
              <ProgressBar
                now={pizza.rating}
                className="rating-progress"
                label={`${pizza.rating}%`}
              />
              <div className="rating-stats">
                <span>⭐ В топе на {pizza.rating}%</span>
                <span>🔥 Вкуснятина</span>
              </div>
            </div>

            <div className="quantity-selector">
              <h3>Количество:</h3>
              <div className="quantity-controls">
                <button onClick={() => {
                    count > 1 ? setCount(count - 1) : setCount(1)
                }} className="quantity-btn">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
                <span className="quantity-value">{count}</span>
                <button onClick={() => setCount(count + 1)} className="quantity-btn">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="price-section">
              <div className="price-wrapper">
                <span className="price-label">Итого:</span>
                <span className="price-value">{pizza.price * count} ₽</span>
              </div>
              <Button onClick={onClickAdd} className="add-to-cart-btn">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.3 5.1 16.3H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H9M15 19C15 20.1 14.1 21 13 21C11.9 21 11 20.1 11 19M15 19H11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Добавить в корзину
              </Button>
            </div>

            <div className="delivery-info">
              <div className="info-item">
                <span className="info-icon">🚚</span>
                <div className="info-text">
                  <h4>Бесплатная доставка</h4>
                  <p>При заказе от 1000 ₽</p>
                </div>
              </div>
              <div className="info-item">
                <span className="info-icon">⏱️</span>
                <div className="info-text">
                  <h4>30-45 минут</h4>
                  <p>Среднее время доставки</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// Компонент скелетона для загрузки
const PizzaSkeleton = () => {
  return (
    <div className="full-pizza-page">
      <Container>
        <div className="skeleton-back-button"></div>
        <Row className="pizza-content">
          <Col lg={6}>
            <div className="skeleton-image"></div>
          </Col>
          <Col lg={6}>
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text short"></div>
            <div className="skeleton-rating"></div>
            <div className="skeleton-size"></div>
            <div className="skeleton-price"></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
