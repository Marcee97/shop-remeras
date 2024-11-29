import { Cardproduct } from "./ui/Cardproduct";
import { Modal } from "./ui/Modal";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "../src/App.css";
import { NavBar } from "./ui/NavBar";
import { Footer } from "./ui/Footer";
import { Success } from "./ui/Success";
import { Hero } from "./ui/Hero";
import { MenuSlide } from "./ui/MenuSlide";
import { ScrollTop } from "./helpers/ScrollTop";

export const App = () => {
  

  
 



  const MainLayout = ({ children }) => {
  const [onSlide, setOnSlide] = useState(false)

const menuSlideOn = ()=> {
  setOnSlide(!onSlide)

}
    return (
      <>
        <NavBar activeSlide={menuSlideOn}/>
        <MenuSlide openCloseSlide={onSlide}/>
        <Hero/>
        {children}
        <Footer />
      </>
    );
  };



  return (
    <>
    <ScrollTop/>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Cardproduct/>
            </MainLayout>
          }
        />
        <Route path="/modal" element={<Modal/>} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </>
  );
};
