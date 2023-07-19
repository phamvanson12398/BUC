import express from "express";
import homeController from "../controller/homeController";
const route = express.Router();

const initWebRoute = (app)=>{
    
    route.get('/',homeController.getUser)
    return app.use('/',route)
}
export default initWebRoute