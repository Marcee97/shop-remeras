import mysql from "mysql2/promise";


export const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'tienda_pay',
    password: 'redondos86'
})