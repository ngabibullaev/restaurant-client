import React, { useCallback, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// @ts-ignore
import star4 from '../Assets/star4.png'
// @ts-ignore
import star5 from '../Assets/star5.png'
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../Redux/Logic/cartSlice";
import { RootState } from "../Redux/store";
import { Accordion, Badge } from "react-bootstrap";

interface CartonProps {
  id: number;
  name: string;
  imageUrl: string;
  title: string;
  price: number;
  rating: number;
  actionsed: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const Carton: React.FC<CartonProps> = ({
  id,
  name,
  imageUrl,
  title,
  price,
  rating,
  actionsed,
  setShow,
}) => {
  const [starRating, setStarRating] = useState()
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
    state.cart.items.find((obj) => obj.id === id)
  );

  const addedCount = cartItem ? cartItem.count : 0;

  useEffect(() => {
    if (rating > 60 && rating < 90) {
      setStarRating((prevState) => prevState = star4)
    } else if (rating > 90) {
      setStarRating((prevState) => prevState = star5)
    }
  }, [rating])

  return (
    <Card className="foods">
      <Card.Img
        onClick={() => setShow(true)}
        className="imgFood"
        variant="top"
        src={imageUrl}
      />
                <Badge className="action" bg="warning" text="dark">
                  {actionsed}
                </Badge>
      <Card.Body>
        <Accordion className="mb-2" defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header className="acord-name">
              <Card.Title>{name}</Card.Title>
            </Accordion.Header>
            <Accordion.Body>
              <Card.Text style={{ color: "gray", margin: "0 20px", paddingBottom: "20px" }}>
                {title}
              </Card.Text>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <div className="badge-count">
        {addedCount > 0 && (
          <Badge className="bg-secondary">+{addedCount}</Badge>
          )}
        </div>
            <img style={{margin: "10px auto", display: "block"}} src={starRating} alt="" />
        {actionsed ? <b className="textPrice text-danger">{price} ₽</b> : <b className="textPrice">{price} ₽</b>}
        <Button onClick={onClickAdd} className="btnAdd" variant="outline-dark">
          <b>Добавить</b>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default React.memo(Carton);
