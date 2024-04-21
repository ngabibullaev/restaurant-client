import React from 'react'
import { Carousel } from 'react-bootstrap'

export const Slider = () => {
  return (
    <Carousel interval={2000}>
      <Carousel.Item>
        <img className='slider-img' src="https://images.deliveryhero.io/image/fd-ph/LH/r9yf-hero.jpg?width=2000&height=500&quality=45" alt="" />
        <Carousel.Caption>
          <h3>Добрый персонал</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className='slider-img' src="https://images.deliveryhero.io/image/fd-sg/LH/x5bs-hero.jpg?width=2000&height=500&quality=45" alt="" />
        <Carousel.Caption>
          <h3>Вкусная еда</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className='slider-img' src="https://www.australianeggs.org.au/assets/Uploads/shutterstock_1662669160-v2__FocusFillWyIwLjAwIiwiMC4wMCIsMjAwMCw1MDBd.jpg" alt="" />
        <Carousel.Caption>
          <h3>Быстрая доставка</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}
