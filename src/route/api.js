import express from "express";
import homeControllerAPI from "../controller/homeControllerAPI"
const route = express.Router();
 const initRouteApi = (app)=>{
    route.get("/user",homeControllerAPI.getuserApi)
    return app.use('/api',route)
 }
 export default initRouteApi




    

    