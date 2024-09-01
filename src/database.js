import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from "./config.js";

import pg from "pg";

/*export const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_DATABASE,
    password: DB_PASSWORD
})*/

export const pool = new pg.Pool({
    host: DB_HOST,
    user: DB_USER,
    database: DB_DATABASE,
    password: DB_PASSWORD
})