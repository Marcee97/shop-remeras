import { Cardproduct } from "./ui/Cardproduct";
import { Modal } from "./ui/Modal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "../src/App.css";
import { NavBar } from "./ui/NavBar";
import { Footer } from "./ui/Footer";
import { Success } from "./ui/Success";
import { Hero } from "./ui/Hero";
import { MenuSlide } from "./ui/MenuSlide";

export const App = () => {
  const [infoModal, setInfoModal] = useState([]);

  const navigate = useNavigate();
  const addElement = (items) => {
    setInfoModal([]);
    setInfoModal((prevInfo) => [...prevInfo, items]);
console.log('messi')
    navigate("/modal");
  };



    


  

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
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Cardproduct infoModal={addElement} />
            </MainLayout>
          }
        />
        <Route path="/modal" element={<Modal infoModals={infoModal} />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </>
  );
};
