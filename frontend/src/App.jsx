import { Cardproduct } from "./ui/Cardproduct";
import { Modal } from "./ui/Modal";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "./ui/NavBar";
import { Footer } from "./ui/Footer";
import { Hero } from "./ui/Hero";
import { ScrollTop } from "./helpers/ScrollTop";
import { MenuSlide } from "./ui/MenuSlide";
import { Carrito } from "./ui/Carrito";
import "./app.css"
export const App = () => {
  const MainLayout = ({ children }) => {
 

    return (
      <section className="app-inter">
        <NavBar />
        <MenuSlide />
        <Carrito/>
        <Hero />
        {children}
        <Footer />
      </section>
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
