import mysql from "mysql2/promise";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from "./config.js";

export const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_DATABASE,
    password: DB_PASSWORD
})