import React, { useCallback, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Badge } from "react-bootstrap";

export const Header = () => {
  const { totalPrice, items } = useSelector((state: RootState) => state.cart);

  const memoizedTotalPrice = useMemo(() => totalPrice, [totalPrice]);
  const memoizedItems = useMemo(() => items, [items]);

  const handleSaveCartToLocalStorage = useCallback(() => {
    localStorage.setItem("cart", JSON.stringify(memoizedItems));
  }, [memoizedItems]);

  // сохраняем данные корзины в localStorage
  React.useEffect(() => {
    handleSaveCartToLocalStorage();
  }, [handleSaveCartToLocalStorage]);

  return (
    <div className="visualhead">
      <div className="Header">
        <Navbar className="bg-body-tertiary">
          <Container>
              <div className="basket-button">
                <svg
                  viewBox="0 0 24 24"
                  width="30px"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke=""
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z"
                      stroke="#ffa500"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
            <Link to="/" className="text-link">
              <h1 className="Hlogo">NAME</h1>
            </Link>

            <Link className="basket-link" to="/basket">
              <div className="basket-button">
                <svg
                  width="30px"
                  fill="orange"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title></title>
                  <path d="M15.93,8,14.5,2.67A1,1,0,0,0,13.28,2a1,1,0,0,0-.71,1.22L13.86,8H10.14l1.29-4.81A1,1,0,0,0,9.5,2.67L8.07,8H1V9.9L3.94,21H20.06L23,10.16,23,8Zm2.6,11H5.47L3.06,10H20.94ZM7.81,11.68A1.15,1.15,0,1,0,9,12.83,1.15,1.15,0,0,0,7.81,11.68ZM16.19,14a1.15,1.15,0,0,0,0-2.3,1.15,1.15,0,0,0,0,2.3Z" />
                </svg>
                <Badge className="badge-price" bg="dark">
                  {memoizedTotalPrice}₽
                </Badge>
              </div>
            </Link>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
