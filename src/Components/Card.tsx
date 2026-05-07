import React, { useCallback, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// @ts-ignore
import star4 from "../Assets/star4.png";
// @ts-ignore
import star5 from "../Assets/star5.png";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../Redux/Logic/cartSlice";
import { RootState } from "../Redux/store";
import { Accordion, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

interface CartonProps {
  id: string;
  name: string;
  imageUrl: string;
  title: string;
  price: number;
  rating: number;
  actionsed: string;
}

const Carton: React.FC<CartonProps> = ({
  id,
  name,
  imageUrl,
  title,
  price,
  rating,
  actionsed,
}) => {
  const [starRating, setStarRating] = useState();
  const dispatch = useDispatch();

  const onClickAdd = useCallback(() => {
    const item = {
      id,
      name,
      price,
      imageUrl,
    };
    dispatch(addItem(item));
  }, [dispatch, id, name, price, imageUrl]);

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((obj) => obj.id === id),
  );

  const addedCount = cartItem ? cartItem.count : 0;

  useEffect(() => {
    if (rating > 60 && rating < 90) {
      setStarRating((prevState) => (prevState = star4));
    } else if (rating > 90) {
      setStarRating((prevState) => (prevState = star5));
    }
  }, [rating]);

  return (
    <Card className="product-card-modern" data-aos="fade-up">
      <div className="card-image-wrapper">
        <Card.Img
          className="product-image"
          variant="top"
          src={imageUrl}
        />
        {actionsed && (
          <div className="discount-badge">
            <span className="discount-text">{actionsed}</span>
          </div>
        )}

        <div className="image-overlay">
          <Button
            className="quick-view-btn"
            variant="light"
          >
            <Link className="LinkButtonImg" to={`/pizza/${id}`}>
              Быстрый просмотр
            </Link>
          </Button>
        </div>
      </div>

      <Card.Body className="card-content">
        <div className="product-header">
          <h3 className="product-title">{name}</h3>
          <div className="rating-wrapper">
            <img src={starRating} alt="Rating" className="rating-stars" />
            <span className="rating-value">{rating}/100</span>
          </div>
        </div>

        <Accordion className="product-accordion" defaultActiveKey="">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="accordion-custom">
              <span className="accordion-title">Описание</span>
            </Accordion.Header>
            <Accordion.Body className="accordion-body-custom">
              <p className="product-description">{title}</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="product-footer">
          <div className="price-section d-flex">
            <span className="price-current">{price} ₽</span>
          </div>
          <Button
            onClick={onClickAdd}
            className="add-to-cart-btn"
            variant="dark"
          >
            Добавить{" "}
            {addedCount > 0 && (
              <div className="count-badge">
                <span className="count-number">+{addedCount}</span>
              </div>
            )}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default React.memo(Carton);
