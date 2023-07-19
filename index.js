import express from "express"
import initWebRoute from "./src/route/web";
import dotenv from "dotenv/config";
import configview from "./src/config/configViewEngine";
import initRouteApi from "./src/route/api";
const app = express();
const port = process.env.PORT;

configview(app)
initWebRoute(app)
initRouteApi(app)


app.listen(port,(req,res)=>{
    console.log(`running http://localhost:${port}`)
})