import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { addItem, minusItem, removeItem } from "../Redux/Logic/cartSlice";
import { ButtonGroup } from "react-bootstrap";

interface BasketCardProps {
  id: string;
  name: string;
  nameResult: string;
  price: number;
  result: number;
  count: number;
  imageUrl?: string;
  idResult: number;
  imageLeftOrRight: string[];
}

const BasketCards: React.FC<BasketCardProps> = React.memo(
  ({
    id,
    name,
    nameResult,
    price,
    result,
    count,
    imageUrl,
    idResult,
    imageLeftOrRight,
  }) => {
    const dispatch = useDispatch();

    const onClickPlus = () => {
      dispatch(addItem({ id, idResult }));
    };

    const onClickMinus = () => {
      dispatch(minusItem({ id, idResult }));
    };

    const onClickRemove = () => {
      if (window.confirm("Ты действительно хочешь удалить товар?")) {
        dispatch(removeItem({ id, idResult }));
      }
    };

    const itemName = name || nameResult;
    const itemPrice = price || result * count;

    console.log(imageLeftOrRight);

    function twoPizzasImage() {
      return (
        <div className="d-flex">
          <div>
            <div className="img-left-basket">
              <img className="twopizzas-img-left-basket" src={imageLeftOrRight[0]} alt="" />
            </div>
          </div>
          <div>
            <div className="img-right-basket">
              <img className="twopizzas-img-right-basket" src={imageLeftOrRight[1]} alt="" />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="basket-card-container">
        <Container>
          <Row className="basket-card-row">
            <Col lg={6} md={12} className="basket-card-info">
              <div className="product-image-wrapper">
                {imageLeftOrRight ? twoPizzasImage() : <img
                  className="product-image"
                  src={imageUrl}
                  alt={itemName}
                />}
                <div className="image-overlay">
                  <span className="overlay-icon">🍕</span>
                </div>
              </div>
              <div className="product-details">
                <h3 className="product-title">{itemName}</h3>
                <button className="remove-btn" onClick={onClickRemove}>
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 7H20M10 11V16M14 11V16M5 7L6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19L19 7M9 7V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Удалить</span>
                </button>
              </div>
            </Col>

            <Col lg={6} md={12} className="basket-card-actions">
              <div className="price-wrapper">
                <span className="price-value">{itemPrice} ₽</span>
              </div>

              <div className="quantity-wrapper">
                <ButtonGroup className="quantity-buttons">
                  <Button
                    className="quantity-btn minus"
                    variant="light"
                    onClick={onClickMinus}
                    disabled={count === 1}
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Button>
                  <Button variant="light" className="quantity-count">
                    <b>{count}</b>
                  </Button>
                  <Button
                    className="quantity-btn plus"
                    variant="light"
                    onClick={onClickPlus}
                  >
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 5V19M5 12H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Button>
                </ButtonGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  },
);

export default BasketCards;
