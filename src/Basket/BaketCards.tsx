import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { addItem, minusItem, removeItem } from "../Redux/Logic/cartSlice";
import { ButtonGroup } from "react-bootstrap";

interface BasketCardProps {
  id: number;
  name: string;
  nameResult: string;
  price: number;
  result: number;
  count: number;
  imageUrl?: string;
  idResult: number;
}

const BasketCards: React.FC<BasketCardProps> = React.memo(
  ({ id, name, nameResult, price, result, count, imageUrl, idResult }) => {
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

    return (
      <div>
        <Container>
          <Row>
            <Col className="basket-card">
              <img
                className="card-image"
                src={
                  imageUrl ||
                  "https://media.dodostatic.net/image/r:292x292/0198bf589106736aa2016b8d2dbeca55.jpg"
                }
                alt=""
              />
              <div>
                <h3>{name || nameResult}</h3>
              </div>
            </Col>
            <Col md={6} className="basket-card-setting">
              <h3 className="pt-2">{price || result * count} ₽</h3>
              <div className="d-flex">
                <nav className="onclickremove" onClick={onClickRemove}>Удалить</nav>
                <div className="p-2"></div>

                <div className="p-2"></div>

                <ButtonGroup aria-label="Basic example">
                  <Button
                    className="basket-section-left"
                    variant="light"
                    onClick={onClickMinus}
                  >
                    —
                  </Button>
                  <Button variant="light">
                    <b>{count}</b>
                  </Button>
                  <Button
                    className="basket-section-right"
                    variant="light"
                    onClick={onClickPlus}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
);

export default BasketCards;
