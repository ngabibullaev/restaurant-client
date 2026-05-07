import "./Styles/Header.scss";
import { Header } from "./Components/Header";
import { Home } from "./Components/Home";
import { Route, Routes } from "react-router-dom";
import { Baket } from "./Basket/Baket";
import { Buy } from "./Buy/Buy";
import { TwoPizzas } from "./Buy/TwoPizzas";
import { Footer } from "./Components/Footer";
import ScrollToTopButton from "./Components/ScrollToTopButton";
import { FullPizza } from "./Components/FullPizza";

export const Root = () => {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pizza/:urlId" element={<FullPizza />} />
        <Route path="/basket" element={<Baket />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/two" element={<TwoPizzas />} />
      </Routes>
      <Footer />
      <ScrollToTopButton/>
    </>
  );
};