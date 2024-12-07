import React, { useEffect, useState } from "react";
import ElContexto from "./ProductContext";

import client from "../api/axios";

export const MyProvider = ({ children }) => {

 
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setproductoSeleccionado] = useState([]);
  const [preferenceId, setPreferenceId] = useState('')
  const [openCloseGuiaDeTalles, setOpenCloseGuiaDeTalles] = useState(false)

  useEffect(() => {
    const peticionProducts = async () => {
      const response = await client.get("/productos");
      setProductos(response.data);
      
    };

    peticionProducts();
  }, []);
console.log(openCloseGuiaDeTalles)
  
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
        openCloseGuiaDeTalles
      }}
    >
      {children}
    </ElContexto.Provider>
  );
};
