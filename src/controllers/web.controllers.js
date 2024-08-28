import { pool } from "../database.js"




export const infoVenta = (req, res) => {
try{

    const data = req.body
    
    console.log(data.producto)
    const response = pool.query(`INSERT INTO ventas (producto, cantidad, precio, talle) VALUES ('${data.producto}', ${data.cantidad}, ${data.precio}, '${data.talle}') `)
}catch(error){
    console.error(error)
}
}