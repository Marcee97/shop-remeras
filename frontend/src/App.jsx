import { Cardproduct  } from "./ui/Cardproduct";
import { Modal } from "./ui/Modal";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "../src/App.css"

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
    <Routes>
     
<Route path="/" element={<Cardproduct infoModal={addElement}/>}/>
<Route path="/modal" element={<Modal infoModals={infoModal}/>}/>
    </Routes>
    </>
  )
}
