import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import "../Styles/Section.scss"
import "../Styles/Review.scss"
import { Link, useLocation } from 'react-router-dom'

export const Footer = () => {

  return (
    <div style={{background: "white", border: "1px solid #c4c4c4"}} className='mt-2'>
      <Container fluid>
        <h5 className='text-secondary pt-2 text-center'>Пользоваиельское соглашение!</h5>
        <Row>
          <Col>
            <b>Правила оплаты:</b>
            <p className='text-secondary'>Оплата производится наличными курьеру при доставке заказа или самовывозом из точки продаж. При оформлении заказа укажите сумму, с которой Вам необходима сдача.</p>
            <b>Безопасность:</b>
            <p className='text-secondary'>Сайт полностью написан под ключ для ресторана "NAME" и использует новейшие методы шифрования для безопасности своих клиентов</p>
          </Col>
          <Col>
            <b>Политика:</b>
            <p className='text-secondary'>Любое использование Вами программы означает полное и безоговорочное принятие Вами условий настоящего лицензионного соглашения.
Если Вы не принимаете условия лицензионного соглашения в полном объёме, Вы не имеете права использовать программу в каких-либо целях.</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}