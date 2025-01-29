import { Cardproduct } from "./ui/Cardproduct";
import { Modal } from "./ui/Modal";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./ui/NavBar";
import { Footer } from "./ui/Footer";
import { Hero } from "./ui/Hero";
import { ScrollTop } from "./helpers/ScrollTop";
import { MenuSlide } from "./ui/MenuSlide";
export const App = () => {
  const MainLayout = ({ children }) => {
    const [onSlide, setOnSlide] = useState(false);

    const menuSlideOn = () => {
      setOnSlide(!onSlide);
    };
    return (
      <>
        <NavBar activeSlide={menuSlideOn} />
        <MenuSlide/>

        <Hero />
        {children}
        <Footer />
      </>
    );
  };

  return (
    <>
      <ScrollTop />
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Cardproduct />
            </MainLayout>
          }
        />
        <Route path="/modal" element={<Modal />} />
      </Routes>
    </>
  );
};
