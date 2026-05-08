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
import { Badge } from "react-bootstrap";
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
      setStarRating(star4);
    } else if (rating > 90) {
      setStarRating(star5);
    }
  }, [rating]);

  return (
    <Card className="product-card-horizontal" data-aos="fade-up">
      <div className="card-horizontal-wrapper">
        {/* Левая часть - изображение */}
        <div className="card-image-section">
          <div className="card-image-wrapper-horizontal">
            <Card.Img className="product-image-horizontal" src={imageUrl} />
            {actionsed && (
              <div className="discount-badge-horizontal">
                <span className="discount-text">{actionsed}</span>
              </div>
            )}
            <div className="image-overlay-horizontal">
              <Link to={`/pizza/${id}`} className="quick-view-link">
                <Button className="quick-view-btn-horizontal" variant="light">
                  🔍 Быстрый просмотр
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Правая часть - информация */}
        <div className="card-info-section">
          <div className="product-header-horizontal">
            <div className="rating-wrapper-horizontal">
              {starRating && (
                <img
                  src={starRating}
                  alt="Rating"
                  className="rating-stars-horizontal"
                />
              )}
              <span className="rating-value-horizontal">{rating}/100</span>
            </div>
          </div>
            <h3 className="product-title-horizontal">{name}</h3>

          <p className="product-description-horizontal">{title}</p>

          <div className="product-footer-horizontal">
            <div className="price-section-horizontal">
              <span className="price-current-horizontal">{price} ₽</span>
              {actionsed && (
                <span className="price-old-horizontal">
                  {Math.floor(price * 1.2)} ₽
                </span>
              )}
            </div>

            <Button
              onClick={onClickAdd}
              className="add-to-cart-btn-horizontal"
              variant="dark"
            >
              Добавить
              {addedCount > 0 && (
                <span className="count-badge-horizontal">+{addedCount}</span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default React.memo(Carton);
