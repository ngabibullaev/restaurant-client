import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button, Badge } from "react-bootstrap";
import "../Styles/TwoPizzas.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { addItem } from "../Redux/Logic/cartSlice";

interface Pizza {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface CartItem {
  result: number;
  nameResult: string;
  idResult: number;
  count: number;
}

export const TwoPizzas: React.FC = () => {
  const dispatch = useDispatch();

  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [left, setLeft] = useState<string>(
    "https://cdn1.iconfinder.com/data/icons/party-111/32/pizza_food_restaurant_menu-256.png",
  );
  const [right, setRight] = useState<string>(
    "https://cdn1.iconfinder.com/data/icons/party-111/32/pizza_food_restaurant_menu-256.png",
  );
  const [priceLeft, setPriceLeft] = useState<number>(0);
  const [priceRight, setPriceRight] = useState<number>(0);
  const [nameLeft, setNameLeft] = useState<string>("");
  const [nameRight, setNameRight] = useState<string>("");
  const [idLeft, setIdLeft] = useState<number>(0);
  const [idRight, setIdRight] = useState<number>(0);
  const [num, setNum] = useState<boolean>(false);
  const [indexUrl, setIndexUrl] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get<Pizza[]>(
        "https://642b35fa208dfe254714763b.mockapi.io/items?category=1",
      )
      .then((response) => {
        setPizzas(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const result = priceLeft + priceRight / 2;
  const nameResult = nameLeft + " + " + nameRight;
  const idResult = idLeft * idRight + 100;

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((obj) => obj.idResult === idResult),
  );

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      result: result,
      nameResult: nameResult,
      idResult: idResult,
      count: 1,
    };
    dispatch(addItem(item));
  };

  const handleClick = (pizza: Pizza, i: number) => {
    setNum(!num);
    setIndexUrl(i);
    if (num === false) {
      console.log(pizza.name);
      setLeft(pizza.imageUrl);
      setPriceLeft(pizza.price);
      setNameLeft(pizza.name);
      setIdLeft(pizza.id);
    } else {
      setRight(pizza.imageUrl);
      setPriceRight(pizza.price);
      setNameRight(pizza.name);
      setIdRight(pizza.id);
    }
  };

  return (
    <div>
      <Container className="rows-twopizzas">
        <h2 className="text-center text-dark pt-2">Соедини две пиццы</h2>
        <div className="d-flex justify-content-center">
          <div>
            <h4 className="text-center text-secondary mt-2 mb-3">Левая</h4>
            <div className="img-left">
              <img className="twopizzas-img-left mb-4" src={left} alt="" />
            </div>
          </div>
          <div>
            <h4 className="text-center text-secondary mt-2 mb-3">Правая</h4>
            <div className="img-right">
              <img className="twopizzas-img-right mb-4" src={right} alt="" />
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between">
          <h3 className="text-dark">{result}₽</h3>
          {left !==
            "https://cdn1.iconfinder.com/data/icons/party-111/32/pizza_food_restaurant_menu-256.png" &&
          right !==
            "https://cdn1.iconfinder.com/data/icons/party-111/32/pizza_food_restaurant_menu-256.png" ? (
            <Button
              onClick={onClickAdd}
              className="mb-2 basket-section-scale"
              variant="dark"
            >
              Добавить{" "}
              {addedCount > 0 && <Badge bg="secondary">+{addedCount}</Badge>}
            </Button>
          ) : (
            <Button className="mb-2" variant="secondary">
              Добавить
            </Button>
          )}
        </div>
      </Container>
      <Container className="rows-twopizzas">
        <Row className="text-center">
          <Col className="mx-auto">
            {pizzas.map((pizza, i) => (
              <Image
                onClick={() => handleClick(pizza, i)}
                className="pizza-image mt-4"
                src={indexUrl !== i ? pizza.imageUrl : undefined}
                thumbnail
                key={i}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};
