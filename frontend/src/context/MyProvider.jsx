import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [productoCarrito, setProductoCarrito] = useState([]);
  const [totalCarrito, setTotalCarrito] = useState(0);
  const [idproducto, setIdproducto] = useState(0);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [idProductosCarrito, setIdProductosCarrito] = useState([]);

  const [selectTalle, setSelectTalle] = useState("inicial");
  const refCatalogo = useRef(null);
  const refFormEnvio = useRef(null);
  const refNombreFocus = useRef(null);
  const refInputEmail = useRef(null);
  const refContBtnWallet = useRef(null);

  const navigate = useNavigate();
  useEffect(() => {
    const peticionProducts = async () => {
      const response = await client.get("/productos");
      console.log(response.data.id, "el id desde /productos");
      setProductos(response.data);
    };

    peticionProducts();
  }, []);

  const peticionProductsModal = async (id) => {
    setIdproducto(id);
    const response = await client.post("/modal-products", {
      id,
    });
    setproductoSeleccionado(response.data);

    navigate("/modal");

    console.log(response);
  };

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

  const addCarrito = () => {
    const transformArray = productoSeleccionado.map((rows) => ({
      ...rows,
      imagenes: rows.imagenes.split(","),
    }));

    setProductoCarrito((prev) => {
      const newCarrito = [...prev, ...transformArray];
      const nuevoTotal = newCarrito.reduce((acc, item) => acc + item.precio, 0);
      const idProductosCarrito = newCarrito.map((item) => item.id);
      setIdProductosCarrito(idProductosCarrito);
      setTotalCarrito(nuevoTotal);
      console.log(idProductosCarrito, "los id obtenidos en prov");

      return newCarrito;
    });
  };

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
        totalCarrito,
        peticionProductsModal,
        idproducto,
        loadingWallet,
        setLoadingWallet,
        refContBtnWallet,
        idProductosCarrito,
        setIdProductosCarrito,
      }}
    >
      {children}
    </ElContexto.Provider>
  );
};
