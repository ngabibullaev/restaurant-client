import { useEffect } from "react";
import "../Styles/Basket-main.scss"
import "../Styles/BasketSection.scss"
import { BasketMain } from './BasketMain';
import {BasketSection} from './BasketSection';
import { Container } from 'react-bootstrap';

export const Baket = () => {
  useEffect(() => window.scroll(0, 0), [])
  return (
    <div>
      <Container className='basket-container'>
        <BasketMain/>
        <hr />
        <BasketSection/>
      </Container>
    </div>
  )
}
