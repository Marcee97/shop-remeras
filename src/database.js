import {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_USER,
} from "./config.js";

import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  password: MYSQL_PASSWORD,
  port: MYSQL_PORT,
  user: MYSQL_USER,
});
