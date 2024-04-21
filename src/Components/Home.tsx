import "../Styles/Main.scss";
import "../Styles/Section.scss";
import "../Styles/Footer.scss";
import "../Styles/Navbar.scss";
import { Main } from "./Main";
import { Navbar } from "./Navbar";
import { Form } from "./Form";
import { Section } from "./Section";
import { Accordion, Container } from "react-bootstrap";
import { Review } from "./Review";
import { Slider } from "./Slider";

export const Home = () => {

  const isDesktop = window.innerWidth >= 1440; // Threshold value for desktop devices

  return (
    <div style={{ background: "#f1f1f1" }}>
      <Slider/>
      <Main />
      <Accordion defaultActiveKey={isDesktop ? "0" : ""}>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="open-menu">
            Открыть меню
          </Accordion.Header>
          <Accordion.Body>
            <Navbar />
            <Form />
            <Section />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className="otziv-main" eventKey="1">
          <Accordion.Header className="open-otziv mt-1">
            Отзывы наших клиентов
          </Accordion.Header>
          <Accordion.Body>
            <Review />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

    </div>
  );
};
