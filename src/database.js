import { PG_DATABASE, PG_HOST, PG_PASSWORD, PG_PORT, PG_USER } from "./config.js";

import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
    host: PG_HOST,
    database: PG_DATABASE,
    password: PG_PASSWORD,
    port: PG_PORT,
    user: PG_USER

})

