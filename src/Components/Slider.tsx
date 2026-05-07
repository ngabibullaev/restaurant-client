import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap'

export const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: "Добро пожаловать в NAME",
      subtitle: "Лучшие блюда от шеф-повара",
      description: "Используем только свежие продукты",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
      icon: "🍽️"
    },
    {
      id: 2,
      title: "Специальное предложение",
      subtitle: "Скидка 20% на первый заказ",
      description: "При заказе от 1000₽",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
      icon: "🎉"
    },
    {
      id: 3,
      title: "Бесплатная доставка",
      subtitle: "При заказе от 1500₽",
      description: "Доставим за 30 минут",
      image: "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg",
      icon: "🚚"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
   <div className="hero-slider">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${index === currentSlide ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        >
          <div className="slide-overlay">
            <div className="slide-content">
              <span className="slide-icon">{slide.icon}</span>
              <h1 className="slide-title">{slide.title}</h1>
              <h2 className="slide-subtitle">{slide.subtitle}</h2>
              <p className="slide-description">{slide.description}</p>
              <button onClick={() => window.scroll(0, 600)} className="slide-btn">Заказать сейчас</button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}
