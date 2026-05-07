import React, { useCallback, useMemo } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";

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
      <div className="header-spacer"></div>
      <div className="header-wrapper">
        <Navbar className="navbar-modern" expand="lg">
          <Container className="nav-container">
            <div className="nav-left">
              <Link to="/" className="logo-link">
                <div className="logo-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.3 5.1 16.3H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H9M15 19C15 20.1 14.1 21 13 21C11.9 21 11 20.1 11 19M15 19C15 17.9 14.1 17 13 17C11.9 17 11 17.9 11 19M15 19H11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h1 className="logo-text">NAME</h1>
              </Link>
            </div>

            <div className="nav-right">
              <Link to="tel:+7999999999" className="promo-link">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7294C21.7209 20.9846 21.5573 21.2136 21.352 21.4019C21.1467 21.5902 20.9044 21.7335 20.6407 21.8227C20.377 21.9119 20.0974 21.945 19.82 21.92C16.7428 21.5856 13.787 20.5341 11.19 18.85C8.7738 17.3147 6.72533 15.2662 5.19 12.85C3.49952 10.2486 2.44783 7.28804 2.12 4.21C2.09497 3.93263 2.12814 3.653 2.21733 3.38931C2.30652 3.12561 2.44977 2.88334 2.63806 2.67802C2.82635 2.47271 3.05535 2.30911 3.31055 2.19752C3.56576 2.08593 3.84151 2.02891 4.12 2.03H7.12C7.64516 2.02507 8.15352 2.20434 8.55764 2.53543C8.96177 2.86653 9.2337 3.3265 9.32 3.84C9.43648 4.6083 9.63514 5.36121 9.91 6.09C10.0422 6.46196 10.0637 6.86433 9.97168 7.24806C9.87969 7.63179 9.67804 7.97844 9.39 8.24L8.19 9.37C9.46565 11.6406 11.3652 13.5351 13.64 14.8L14.78 13.6C15.0425 13.3129 15.3895 13.1122 15.773 13.0208C16.1565 12.9295 16.5584 12.9514 16.93 13.08C17.6595 13.3518 18.4127 13.5475 19.18 13.66C19.6956 13.7457 20.157 14.018 20.4886 14.4232C20.8201 14.8284 20.9988 15.3383 20.99 15.86V16.92Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Позвонить</span>
              </Link>

              <Link to="/basket" className="basket-link-modern">
                <div className="basket-icon-wrapper">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.93,8,14.5,2.67A1,1,0,0,0,13.28,2a1,1,0,0,0-.71,1.22L13.86,8H10.14l1.29-4.81A1,1,0,0,0,9.5,2.67L8.07,8H1V9.9L3.94,21H20.06L23,10.16,23,8Zm2.6,11H5.47L3.06,10H20.94ZM7.81,11.68A1.15,1.15,0,1,0,9,12.83,1.15,1.15,0,0,0,7.81,11.68ZM16.19,14a1.15,1.15,0,0,0,0-2.3,1.15,1.15,0,0,0,0,2.3Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span className="basket-text">
                  {memoizedTotalPrice > 0 ? (
                    <span className="basket-badge">{memoizedTotalPrice}₽</span>
                  ) : (
                    "Корзина"
                  )}
                </span>
              </Link>
            </div>
          </Container>
        </Navbar>
      </div>
    </div>
  );
};
