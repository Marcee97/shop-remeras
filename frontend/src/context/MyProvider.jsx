import React, { useEffect, useRef, useState } from "react";
import ElContexto from "./ProductContext";

import client from "../api/axios";

export const MyProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setproductoSeleccionado] = useState([]);
  const [preferenceId, setPreferenceId] = useState("");
  const [openCloseGuiaDeTalles, setOpenCloseGuiaDeTalles] = useState(false);
  const [openCloseSectionPay, setOpenCloseSectionPay] = useState(false);
  const [openInfoMetodoDePago, setOpenInfoMetodoDePago] = useState(true);
  const [openCloseFormEnvio, setOpenCloseFormEnvio] = useState(false);

  useEffect(() => {
    const peticionProducts = async () => {
      const response = await client.get("/productos");
      setProductos(response.data);
    };

    peticionProducts();
  }, []);

  const refCatalogo = useRef(null);
  const refFormEnvio = useRef(null);
  const refNombreFocus = useRef(null);
  const refInputEmail = useRef(null);

  

  const verTodo = () => {
    const catalogo = refCatalogo.current;
    catalogo.scrollIntoView({ block: "end", behavior: "smooth" });
  };

  const sliceFormEnvio = () => {
    const formnEnvio = refFormEnvio.current;
    formnEnvio.scrollIntoView({ block: "start", behavior: "smooth" });
    console.log('Se ejecuto el slide')
  }


  const focusFormEnvio = ()=> {
    const inputEmail = refInputEmail.current;
    inputEmail.focus();
  }
  return (
    <ElContexto.Provider
      value={{
        productos,
        setProductos,
        setproductoSeleccionado,
        productoSeleccionado,
        setPreferenceId,
        preferenceId,
        setOpenCloseGuiaDeTalles,
        openCloseGuiaDeTalles,
        refCatalogo,
        verTodo,
        openCloseSectionPay,
        setOpenCloseSectionPay,
        openInfoMetodoDePago,
        setOpenInfoMetodoDePago,
        openCloseFormEnvio,
        setOpenCloseFormEnvio,
        refFormEnvio,
        sliceFormEnvio,
        refInputEmail,
        focusFormEnvio
      }}
    >
      {children}
    </ElContexto.Provider>
  );
};
