import { useEffect, useState, useRef } from "react";
import "../style/modal.scss";
import axios from "axios";


export const Modal = ({ infoModals }) => {
  const [dataRecibida, setDataRecibida] = useState([]);
  const refProducto = useRef(null)
  const refPrecio = useRef(null)

const [preferenciasRemera, setPreferenciasRemera] = useState({
  talle:'XXl',
  cantidad: 1
})


const addPreferencias = (event)=> {
  const {name, value} = event.target;
  setPreferenciasRemera(prevPreferencias => ({
    ...prevPreferencias,
    [name]: value,
  }))

}

const compraDef = async()=> {
  /*console.log(preferenciasRemera.cantidad, preferenciasRemera.talle)

  axios.post('http://localhost:3000/infoVenta',{
    producto: producto,
    precio: precio,
    cantidad: preferenciasRemera.cantidad,
    talle: preferenciasRemera.talle
  })
    */


  const producto = refProducto.current.textContent
  const precio = refPrecio.current.textContent
const precioNumber = parseInt(precio, 10)
const cantidadNumber = parseInt(preferenciasRemera.cantidad, 10)
console.log(typeof precioNumber, producto, typeof cantidadNumber)

 try{

   const response = await axios.post("http://localhost:3000/createOrder", {
     producto: producto,
     precio: precioNumber,
     cantidad: cantidadNumber,
     
    });
    
    console.log(response.data.init_point)
    if(response.data.init_point){
      window.location.href = response.data.init_point;
    }
    
  }catch(error){
    console.log(error)
  }
}


useEffect(() => {
  setDataRecibida(infoModals);
}, [infoModals]);


  return (
    <section>
      <div>
        {dataRecibida.map((item, index) => (
          <section key={index} className="modal-cardproduct">
            <p className="btn-back-modal-product">
              <i className="fa-solid fa-arrow-left"></i>Regresar a Shop
            </p>
            <div className="cont-modal-product">
              <img src={item.imagen} alt="imagen producto modal" />
              <h5 ref={refProducto}>{item.nombre}</h5>
              <p className="descripcion-modal-product">{item.descripcion}</p>
            </div>
            <div className="cont-preferencias-modal-product">
              <h6 className="precio-modal-product">TOTAL: $ <span ref={refPrecio}>{item.precio}</span></h6>

              <label htmlFor="talle" className="label-talle-modal-product">
                Talle
              </label>
              <select
                name="talle"
                id="talle"
                className="select-talle-modal-product" onChange={addPreferencias}
              >
                <option value="S">S</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>

              <label htmlFor="cantidad" className="label-talle-modal-product">
                Cantidad
              </label>
              <select
                name="cantidad"
                id="cantidad"
                className="select-talle-modal-product" onChange={addPreferencias}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
            <div className="cont-btn-modal-product">
              <button className="btn-comprar-modal-product" onClick={compraDef}>
                Comprar ahora
              </button>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
};
