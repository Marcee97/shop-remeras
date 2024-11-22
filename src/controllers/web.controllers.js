import { pool } from "../database.js"


export const modalProduct = async(req, res) => {
    try{

        const idProducto = req.body.id
        console.log(idProducto)
        const [rows] = await pool.query('SELECT productos.nombre, productos.precio, productos.cantidad, GROUP_CONCAT(imagenes.url_imagen) AS imagenes FROM productos JOIN imagenes ON productos.id = imagenes.id_imagen WHERE productos.id = ? GROUP BY productos.id', [idProducto])
        res.status(200).json(rows)
        console.log(rows)
    }catch(err){
        console.error(err)
    }
    }



//'SELECT productos.nombre, productos.precio, imagenes.url_imagen FROM productos JOIN imagenes ON productos.id = imagenes.id_imagen'