import "../Styles/Section.scss";
import "../Styles/Footer.scss";
import "../Styles/Navbar.scss";
import { Navbar } from "./Navbar";
import { Form } from "./Form";
import { Section } from "./Section";
import { Accordion, Container } from "react-bootstrap";
import { Review } from "./Review";
import { Slider } from "./Slider";

export const Home = () => {

  return (
    <Container fluid="lg" className="keklol">
      <div className="accordion-wrapper">
        <Slider/>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0" className="accordion-menu-item">
            <Accordion.Header className="accordion-header-modern">
              <span className="header-icon">🍽️</span>
              Открыть меню
            </Accordion.Header>
            <Accordion.Body className="accordion-body-modern">
              <Navbar />
              <Form />
              <Section />
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item className="accordion-reviews-item" eventKey="1">
            <Accordion.Header className="accordion-header-modern">
              <span className="header-icon">⭐</span>
              Отзывы наших клиентов
            </Accordion.Header>
            <Accordion.Body className="accordion-body-modern">
              <Review />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </Container>
  );
};
