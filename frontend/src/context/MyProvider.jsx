import React, { useEffect, useState } from "react";
import ElContexto from "./ProductContext";
import axios from "axios";
import client from "../api/axios";
import { useNavigate } from "react-router-dom";
export const MyProvider = ({ children }) => {

    const navigate = useNavigate()
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setproductoSeleccionado] = useState([]);

  useEffect(() => {
    const peticionProducts = async () => {
      const response = await client.get("/productos");
      setProductos(response.data);
      
    };

    peticionProducts();
  }, []);
console.log(productoSeleccionado)

  return (
    <ElContexto.Provider
      value={{
        productos,
        setProductos,
        setproductoSeleccionado,
        productoSeleccionado
      }}
    >
      {children}
    </ElContexto.Provider>
  );
};
