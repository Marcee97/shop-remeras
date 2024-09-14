import { Cardproduct  } from "./ui/Cardproduct";
import { Modal } from "./ui/Modal";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "../src/App.css"
import { NavBar } from "./ui/NavBar";
import { Footer } from "./ui/Footer";

export const App = () => {
const [infoModal, setInfoModal] = useState([])

const navigate = useNavigate()
const addElement = (items)=> {
  setInfoModal([])
  setInfoModal(prevInfo => ([...prevInfo, items]))
  
  navigate("/modal")
}

  return (
    <>
    <NavBar/>
    
    
    <Routes>
<Route path="/" element={<Cardproduct infoModal={addElement}/>}/>
<Route path="/modal" element={<Modal infoModals={infoModal}/>}/>
    </Routes>
<Footer/>
    </>
  )
}
