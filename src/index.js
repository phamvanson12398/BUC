import express from "express"
import dotenv from "dotenv/config";
import { getConnection, initDataMysql, initTable } from "./databases/mysql";
import { initRoute } from "./routes/route";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 
const port = process.env.PORT;
initRouteUser(app)


app.listen(port, async (req, res) => {
    await initDataMysql();
    await getConnection();
    await initDataMysql();
    await initTable()
    console.log(`running http://localhost:${port}`)
})