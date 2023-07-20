import express from "express"
import dotenv from "dotenv/config";

// import initRouteApi from "./route/api";
import { getConnection, initDataMysql, initTable } from "./databases/mysql";

const app = express();
const port = process.env.PORT;



app.listen(port,async (req,res)=>{
    await initDataMysql();
    await getConnection();
    await initTable()
    console.log(`running http://localhost:${port}`)
})