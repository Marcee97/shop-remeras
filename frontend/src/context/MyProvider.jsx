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
  const [openCloseFormEnvio, setOpenCloseFormEnvio] = useState("inicial");
  const [openCloseMenuSlide, setOpenCloseMenuSlide] = useState(true);
  const [openCloseCarrito, setOpenCloseCarrito] = useState(true);
  const [productoCarrito, setProductoCarrito] = useState([])
  const [totalCarrito, setTotalCarrito] = useState(0)

  const [selectTalle, setSelectTalle] = useState("inicial");

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
  };

  const focusFormEnvio = () => {
    const inputEmail = refInputEmail.current;
    inputEmail.focus();
  };

  

  const addCarrito = ()=> {
    
  const transformArray = productoSeleccionado.map((rows) => ({
    ...rows,
    imagenes: rows.imagenes.split(","),
  }));


  setProductoCarrito((prev) => {
    const newCarrito = [...prev, ...transformArray]
    const nuevoTotal = newCarrito.reduce((acc, item) => acc + item.precio, 0)
    setTotalCarrito(nuevoTotal)

return newCarrito
  });
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
        focusFormEnvio,
        selectTalle,
        setSelectTalle,
        openCloseMenuSlide,
        setOpenCloseMenuSlide,
        openCloseCarrito,
        setOpenCloseCarrito,
        productoCarrito,
        addCarrito,
        totalCarrito
      }}
    >
      {children}
    </ElContexto.Provider>
  );
};
