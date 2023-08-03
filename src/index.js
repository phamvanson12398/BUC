import express from "express"
import dotenv from "dotenv/config";
import { getConnection, initDataMysql, initTable } from "./databases/mysql";
import bodyParser from "body-parser";
import { allRoute } from "./routes/allRoute";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT;
allRoute(app)
app.listen(port, async (req, res) => {
    await initDataMysql();
    await getConnection();
    await initTable()
    console.log(`running http://localhost:${port}`)
})