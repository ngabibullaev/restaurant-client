import "../Styles/Basket-main.scss"
import "../Styles/BasketSection.scss"
import { BasketMain } from './BasketMain';
import {BasketSection} from './BasketSection';
import { Container } from 'react-bootstrap';

export const Baket = () => {
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
