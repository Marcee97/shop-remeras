import "../style/cardproduct.scss";
import client from "../api/axios.js";
import { useState, useEffect } from "react";

export const Cardproduct = ({infoModal}) => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await client.get("/productos");

        setProductData(response.data);

        console.log(productData);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  
  return (
    <section className="cardproduct">
      {productData.map((items, index) => (
        <div key={index} className="cuerpo-cardproduct" onClick={()=> infoModal(items)}>
          <div>

          <i className="fa-regular fa-heart icon-addcar-cardproduct"></i>
            <img
              src={items.imagen}
              alt="imagen de producto"
              className="img-cardproduct"
              />
              </div>
            <strong className="precio-cardproduct">${items.precio}</strong>
        </div>
      ))}
    </section>
  );
};
