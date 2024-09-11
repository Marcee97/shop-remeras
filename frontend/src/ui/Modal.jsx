import { useEffect, useState, useRef } from "react";
import "../style/modal.scss";
import axios from "axios";

export const Modal = ({ infoModals }) => {
  const [dataRecibida, setDataRecibida] = useState([]);
  const [openClosePagos, setopenClosePagos] = useState(false);
  const refProducto = useRef(null);
  const refPrecio = useRef(null);
  const refDescripcion = useRef(null);

const [preferenciasRemera, setPreferenciasRemera] = useState({
    talle: "XXl",
    cantidad: 1,
  });


const [formularioEnvio, setFormularioEnvio] = useState({
  nombre: '',
  apellido: '',
  calle: '',
  numero:'',
  piso:'',
  departamento:'',
  codigopostal:'',
  provincia: ''

})



  


const dataExterna = (e)=> {

const {name, value} = e.target;

setFormularioEnvio((prevData) => {
  const updatedData = {
    ...prevData,
    [name]: value,
  }
  
  console.log(updatedData)
  return updatedData
})
}




const compraDef = async () => {
  setopenClosePagos((prevState) => !prevState);

};




  const crearPago = async()=> {

    const producto = refProducto.current.textContent;
    const precio = refPrecio.current.textContent;
    const descripcion = refDescripcion.current.textContent;
    const precioNumber = parseInt(precio, 10);
    const cantidadNumber = parseInt(preferenciasRemera.cantidad, 10);
    console.log(descripcion);

    try {
      const response = await axios.post("http://localhost:3000/createOrder", {
        producto: producto,
        descripcion: descripcion,
        precio: precioNumber,
        cantidad: cantidadNumber,
        formularioEnvio: formularioEnvio
      });

      console.log(response.data.init_point);
      if (response.data.init_point) {
        window.open(response.data.init_point, '__blank');

        console.log("cambio de pagina  mercadopago");
      }
    } catch (error) {
      console.log(error);
    }

    
      
  }

  
  useEffect(() => {
    setDataRecibida(infoModals);
  }, [infoModals]);




  


  return (
    <section className="modal">
      <div>
        {dataRecibida.map((item, index) => (
          <section key={index} className="modal-cardproduct">
            <p className="btn-back-modal-product">
              <i className="fa-solid fa-arrow-left"></i>Regresar a Shop
            </p>
            <div className="cont-modal-product">
              <img src={item.imagen} alt="imagen producto modal" />
              <h5 ref={refProducto}>{item.nombre}</h5>
              <p className="descripcion-modal-product" ref={refDescripcion}>
                {item.descripcion}
              </p>
            </div>
            <div className="cont-preferencias-modal-product">
              <h6 className="precio-modal-product">
                TOTAL: $ <span ref={refPrecio}>{item.precio}</span>
              </h6>

              <label htmlFor="talle" className="label-talle-modal-product">
                Talle
              </label>
              <select
                name="talle"
                id="talle"
                className="select-talle-modal-product"
                
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
                className="select-talle-modal-product"
                
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
      {openClosePagos && (
        <div className="payment-data">
          <h5>CONTACTO</h5>
          <input type="email" placeholder="Email"/>

          <h5>DIRECCION</h5>
          <div className="cont-direccion">
          <input type="text" placeholder="Nombre" name="nombre" onChange={dataExterna}/>
          <input type="text" placeholder="Apellido" name="apellido" onChange={dataExterna}/>
          <input type="text" placeholder="Calle" name="calle" onChange={dataExterna}/>
          <input type="text" placeholder="Numero" name="numero" onChange={dataExterna}/>
          <input type="text" placeholder="Piso" name="piso" onChange={dataExterna}/>
          <input type="text" placeholder="Departamento" name="departamento" onChange={dataExterna} />
          <input type="text" placeholder="Codigo Postal" name="codigopostal" onChange={dataExterna} />

          <select name="provincia" id="prov" className="select-provincia-modal" onChange={dataExterna}>
            <option value="cordoba">Cordoba</option>
            <option value="salta">Salta</option>
            <option value="buenos aires">Buenos Aires</option>
            <option value="CABA">Ciudad Autonoma de Buenos Aires</option>
            <option value="san luis">San luis</option>
            <option value="entre rios">Entre Rios</option>
            <option value="la rioja">La Rioja</option>
            <option value="santiago del estero">Santiago del Estero</option>
          </select>
          </div>
          <button className="btn-pagar-modal-product" onClick={crearPago}>Ir a pagar</button>
        </div>
      )}
    </section>
  );
};
