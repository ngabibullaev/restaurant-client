import BaketCards from "./BaketCards";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { RootState } from "../Redux/store";
import { clearItems } from "../Redux/Logic/cartSlice";
import { BasketEmpty } from "./BasketEmpty";

export const BasketSection = () => {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector((state: RootState) => state.cart);

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  const onClickClear = () => {
    if (window.confirm("Очистить все товары")) {
      dispatch(clearItems());
    }
  };

  if (!totalCount) {
    return <BasketEmpty />;
  }

  console.log(items)

  return (
    <div className="basket-section">
      <div className="basket-header">
        <div className="header-content">
          <div className="title-wrapper">
            <div className="icon-wrapper">
              <span className="cart-icon">🛒</span>
            </div>
            <h2 className="section-title">Корзина</h2>
            <span className="items-count">{totalCount} товара</span>
          </div>
          
          <button className="clear-all-btn" onClick={onClickClear}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 7H20M10 11V16M14 11V16M5 7L6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19L19 7M9 7V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>Очистить корзину</span>
          </button>
        </div>
      </div>

      <div className="basket-items">
        {items.map((item) => (
          <div key={item.id} className="basket-item-wrapper">
            <BaketCards {...item} />
          </div>
        ))}
      </div>

      <div className="basket-summary">
        <div className="summary-card">
          <div className="summary-header">
            <h3>Итого заказа</h3>
            <div className="summary-details">
              <div className="summary-item">
                <span className="summary-label">Товаров:</span>
                <span className="summary-value">{totalCount} шт.</span>
              </div>
              <div className="summary-item total">
                <span className="summary-label">Сумма:</span>
                <span className="summary-value total-price">{totalPrice} ₽</span>
              </div>
            </div>
          </div>

          <div className="summary-actions">
            <Link to="/" className="action-link back-link">
              <Button className="action-btn back-btn" variant="outline-dark">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Вернуться назад
              </Button>
            </Link>
            
            <Link to="/buy" className="action-link checkout-link">
              <Button className="action-btn checkout-btn" variant="warning">
                <span>Оформить заказ</span>
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </Button>
            </Link>
          </div>

          <div className="delivery-info">
            <div className="info-item">
              <span className="info-icon">🚚</span>
              <div className="info-text">
                <p>Бесплатная доставка</p>
                <small>При заказе от 1000 ₽</small>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">⏱️</span>
              <div className="info-text">
                <p>Быстрая доставка</p>
                <small>30-45 минут</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};