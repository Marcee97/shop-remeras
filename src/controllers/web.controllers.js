import { pool } from "../database.js"


export const modalProduct = async(req, res) => {
    try{
        const idProducto = req.body.id
        console.log(idProducto)
       
        const [rows] = await pool.query('SELECT productos.nombre, productos.precio, productos.cantidad, productos.talles, GROUP_CONCAT(DISTINCT imagenes.url_imagen ORDER BY imagenes.id ASC) AS imagenes FROM productos LEFT JOIN imagenes ON productos.id = imagenes.id_imagen WHERE productos.id = ? GROUP BY productos.id', [idProducto])

        res.status(200).json(rows)
        console.log(rows)
    }catch(err){
        console.error(err)
    }
    }


    export const tallesProducts = async(req, res) => {

    }

    export const login = async(req, res) => {
 
 
// If your app is served through a proxy
// trust the proxy to allow us to read the `X-Forwarded-*` headers
app.set("trust proxy", true)
app.use("/auth/*", ExpressAuth({ providers: [] }))
    }



//'SELECT productos.nombre, productos.precio, imagenes.url_imagen FROM productos JOIN imagenes ON productos.id = imagenes.id_imagen'