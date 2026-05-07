import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Alert, Button, Container } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

type ReviewItem = {
  name: string;
  ratingIndex: number;
  createdAt: string;
};

const PAGE_SIZE = 10;

export const Review: React.FC = () => {
  const rating: string[] = ["★", "★", "★", "★", "★"];

  const [ratingIndex, setRatingIndex] = useState<number>(-1);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [name, setName] = useState<string>("");
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (hasMore) {
      const response = await axios.get(
        `https://restaurant-server-ohyq.onrender.com/setting?_page=${page}&_limit=${PAGE_SIZE}`,
      );
      const newReviews = response.data;
      setReviews((prev) => [...prev, ...newReviews]);
      setPage((prev) => prev + 1);
      if (newReviews.length < PAGE_SIZE) {
        setHasMore(false);
      }
    }
  }, [hasMore, page]);

  const handleObserver = useCallback(
    (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting && hasMore) {
        loadMore();
      }
    },
    [hasMore, loadMore],
  );

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const currentLoader = loader.current; 

    const observer = new IntersectionObserver(handleObserver, options);
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [handleObserver]);

  const handleNameChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    const review = { name, ratingIndex };

    axios
      .post("https://restaurant-server-ohyq.onrender.com/", review)
      .then((response) => {
        console.log(response);
        const savedReview = response.data.data; // или response.data, зависит от вашего сервера
        setReviews((prev) => [...prev, savedReview]);
      })
      .catch((error) => console.error(error));

    setName("");
    setRatingIndex(-1);
  };

  console.log(reviews)

  return (
    <div className="reviews-section">
      <Container>
        <h2 className="reviews-title">Оставить отзыв</h2>
        
        <div className="review-form">
          <FloatingLabel controlId="floatingTextarea2" label="Ваш комментарий">
            <Form.Control
              as="textarea"
              placeholder="Оставьте ваш отзыв здесь..."
              maxLength={200}
              className="review-textarea"
              onChange={handleNameChange}
              value={name}
            />
          </FloatingLabel>
          
          <div className="form-actions">
            <div className="rating-stars">
              {rating.map((r, i) => (
                <span
                  key={i}
                  onClick={() => setRatingIndex(i)}
                  style={{marginTop: "-15px"}}
                  className={ratingIndex >= i ? 'star active' : 'star'}
                >
                  {r}
                </span>
              ))}
            </div>
            
            {!name.trim() || ratingIndex === -1 ? (
              <Button variant="secondary" className="submit-btn-inactive">
                Добавить
              </Button>
            ) : (
              <Button variant="warning" onClick={handleSubmit} className="submit-btn-active">
                Отправить отзыв
              </Button>
            )}
          </div>
        </div>
        
        <hr className="divider-full" />
        
        <h2 className="reviews-title">Отзывы клиентов</h2>
        
        <div className="reviews-list">
          {reviews.map((item, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <h5 className="review-date">
                  <img
                    className="avatar-icon"
                    src="https://cdn2.iconfinder.com/data/icons/school-set-5/512/6-20.png"
                    alt="calendar"
                  />
                  {new Date(item.createdAt).toLocaleString('ru-RU')}
                </h5>
                <div className="review-stars">
                  {rating.map((r, i) => (
                    <span key={i} className={i <= item.ratingIndex ? 'star small active' : 'star small'}>
                      {r}
                    </span>
                  ))}
                </div>
              </div>
              <p className="review-text">
                <img
                  className="user-icon"
                  src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_user-24.png"
                  alt="user"
                />
                {item.name}
              </p>
            </div>
          ))}
        </div>
        
        <div ref={loader} className="loader-more"></div>
        
        {!hasMore && reviews.length > 0 && (
          <p className="end-message">✨ Больше нет отзывов ✨</p>
        )}
      </Container>
    </div>
  );
};
