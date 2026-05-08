import React, { useState, useEffect } from "react";
import { Container, Image, Button, Badge } from "react-bootstrap";
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
  imageLeftOrRight: string[];
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
  const imageLeftOrRight = [left, right]

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((obj) => obj.idResult === idResult),
  );

  const addedCount = cartItem ? cartItem.count : 0;

  const onClickAdd = () => {
    const item: CartItem = {
      result: result,
      nameResult: nameResult,
      idResult: idResult,
      imageLeftOrRight: imageLeftOrRight,
      count: 1,
    };
    dispatch(addItem(item));
  };

  const handleClick = (pizza: Pizza, i: number) => {
    window.scroll(0, 0)
    setNum(!num);
    setIndexUrl(i);
    if (num === false) {
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


  const isPizzasSelected = left !== "https://cdn1.iconfinder.com/data/icons/party-111/32/pizza_food_restaurant_menu-256.png" &&
    right !== "https://cdn1.iconfinder.com/data/icons/party-111/32/pizza_food_restaurant_menu-256.png";

  return (
    <div className="two-pizzas-page">
      <Container className="two-pizzas-container">
        <div className="page-header">
          <h2 className="page-title">Соедини две пиццы</h2>
          <p className="page-subtitle">Создай свою уникальную комбинацию</p>
        </div>

        <div className="d-flex justify-content-center">
          <div>
            <div className="pizza-label">Левая половинка</div>
            <div className="img-left">
              <img className="twopizzas-img-left mb-4" src={left} alt="" />
            </div>
          </div>
          <div>
            <div className="pizza-label">Правая половинка</div>
            <div className="img-right">
              <img className="twopizzas-img-right mb-4" src={right} alt="" />
            </div>
          </div>
        </div>


        <div className="result-section">
          <div className="result-info">
            <div className="result-details">
              <span className="result-label">Итоговая цена:</span>
              <span className="result-price">{Math.floor(result)} ₽</span>
            </div>
            {nameLeft && nameRight && (
              <div className="result-name">
                <span className="result-name-label">Ваша пицца:</span>
                <span className="result-name-value">{nameResult}</span>
              </div>
            )}
          </div>

          <Button
            onClick={onClickAdd}
            className={`add-btn ${!isPizzasSelected ? 'disabled-btn' : ''}`}
            variant={isPizzasSelected ? "dark" : "secondary"}
            disabled={!isPizzasSelected}
          >
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.3 5.1 16.3H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H9M15 19C15 20.1 14.1 21 13 21C11.9 21 11 20.1 11 19M15 19H11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Добавить в корзину
            {addedCount > 0 && (
              <Badge bg="warning" className="count-badge">
                +{addedCount}
              </Badge>
            )}
          </Button>
        </div>
      </Container>

      <Container className="pizzas-gallery">
        <div className="gallery-header">
          <h3>Выберите пиццы</h3>
          <p>Кликните на пиццу, чтобы добавить её в левую или правую половинку</p>
        </div>

        <div className="pizzas-grid">
          {pizzas.map((pizza, i) => (
            <div
              key={i}
              className={`pizza-item ${indexUrl === i ? 'selected' : ''}`}
              onClick={() => {
                indexUrl !== i && handleClick(pizza, i)
              }}
            >
              <div className="pizza-item-image">
                <Image src={pizza.imageUrl} thumbnail />
                {indexUrl === i && (
                  <div className="selected-overlay">
                    <span>✓</span>
                  </div>
                )}
              </div>
              <div className="pizza-item-info">
                <h4 className="pizza-item-name">{pizza.name}</h4>
                <p className="pizza-item-price">{pizza.price} ₽</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};