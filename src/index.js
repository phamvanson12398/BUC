import express from "express"
import dotenv from "dotenv/config";
import { getConnection, initDataMysql, initTable } from "./databases/mysql";
import bodyParser from "body-parser";
import { userRouter } from "./routes/userRoute";
import { authRoute } from "./routes/authRoute";
import { deviceRoute } from "./routes/deviceRoute";
import { fileRoute } from "./routes/fileRoute";
import { permissionRoute } from "./routes/permissionRoute";
import { versionRoute } from "./routes/versionRoute";
import { mailRoute } from "./routes/mailSenderRoute";
import { mailServerRoute } from "./routes/mailServerRoute";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT;
userRouter(app)
authRoute(app)
deviceRoute(app)
fileRoute(app)
mailRoute(app)
mailServerRoute(app)
permissionRoute(app)
versionRoute(app)
app.listen(port, async (req, res) => {
    await initDataMysql();
    await getConnection();
    await initTable()
    console.log(`running http://localhost:${port}`)
})