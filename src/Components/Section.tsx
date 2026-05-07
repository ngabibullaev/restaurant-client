import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carton from "./Card";
import { RootState } from "../Redux/store";
import { Reload } from "./Reload";
import axios from "axios";
import * as qs from "qs";
import { useNavigate } from "react-router-dom";
import { setFilters } from "../Redux/Logic/logicSlice";

interface Item {
  id: string;
  name: string;
  imageUrl: string;
  title: string;
  price: number;
  rating: number;
  actionsed: string;
}

export const Section: React.FC = () => {
  const { categoryId, sortId, sortOrder, search } = useSelector(
    (state: RootState) => state.logic,
  );

  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const memoizedCategoryId = useMemo(() => categoryId, [categoryId]);
  const memoizedSortId = useMemo(() => sortId, [sortId]);
  const memoizedSortOrder = useMemo(() => sortOrder, [sortOrder]);
  const memoizedSearch = useMemo(() => search, [search]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(
        setFilters({
          ...params,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      axios
        .get(
          `https://642b35fa208dfe254714763b.mockapi.io/items?${
            memoizedCategoryId > 0 ? `category=${memoizedCategoryId}` : ""
          }&sortBy=${memoizedSortId}&order=${memoizedSortOrder}${
            memoizedSearch ? `&search=${memoizedSearch}` : ""
          }`,
        )
        .then((response) => {
          setItems(response.data);
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }

    isSearch.current = false;
  }, [memoizedCategoryId, memoizedSortId, memoizedSortOrder, memoizedSearch]);

  // отображаем в поисковой строке данные поиска
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sortId,
        categoryId,
        order: sortOrder,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true
  }, [memoizedCategoryId, memoizedSortId, memoizedSortOrder, memoizedSearch]);

  return (
    <div className="product-section">
      <Container fluid="xxl">
        <Row className="g-4">
          {isLoading ? (
            [...new Array(8)].map((_, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <Reload />
              </Col>
            ))
          ) : items.length > 0 ? (
            items.map((item, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3}>
                <Carton
                  id={item.id}
                  name={item.name}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  price={item.price}
                  rating={item.rating}
                  actionsed={item.actionsed}
                />
              </Col>
            ))
          ) : (
            <div className="empty-state">
              <svg className="empty-icon" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 12V8H4V12M20 12L4 12M20 12L21 18H3L4 12M12 8V12M9 8V12M15 8V12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <p className="empty-text">У нас такого нет</p>
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};
