import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


export const BasketMain = () => {
    return (
        <div>
                <Row>
                    <Col><img style={{borderRadius: "50%"}} className='basket-main-img' src="https://media.dodostatic.net/image/r:292x292/0198bf589106736aa2016b8d2dbeca55.jpg" alt="" /></Col>
                    <Col>
                        <h2 className='basket-main-title'>Соедини половинки</h2>
                        <p className='basket-main-p'>попробуй сразу две пиццы по одной цене</p>
                        <Link className='text-link' to="/two"><Button className='basket-main-btn basket-section-scale' variant="warning">Попробовать ➞</Button></Link>{' '}
                    </Col>
                </Row>
        </div>
    )
}
