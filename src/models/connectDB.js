import mysql from"mysql2";
import dotenv from "dotenv/config"
const pool = mysql.createPool({
    host:process.env.DB_HOST,
    database:process.env.DB_NAME,
    user:process.env.DB_USER
    
})


export default pool