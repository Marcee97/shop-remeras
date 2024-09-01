import { pool } from "../database.js"



/*
export const infoVenta = (req, res) => {
try{

    const data = req.body
    
    console.log(data.producto)
    const response = pool.query(`INSERT INTO ventas (producto, cantidad, precio, talle) VALUES ('${data.producto}', ${data.cantidad}, ${data.precio}, '${data.talle}') `)
}catch(error){
    console.error(error)
}
}
*/

export const addProduct = async(req, res) => {

    try{

        const nombre = req.body.nombre;
        const precio = req.body.precio;
        const descripcion = req.body.descripcion;
        const imagen = req.body.imagen;
        
        const response = await pool.query('INSERT INTO productos (nombre, precio, descripcion, imagen) VALUES ($1, $2, $3, $4)',[nombre, precio, descripcion, imagen])
    }catch(error){
        console.log(error, 'error')
    }
}