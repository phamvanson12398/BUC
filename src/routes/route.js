import express from "express"
import userController from "../controllers/userController";
import permissionController from "../controllers/permissionController";
let route = express.Router();

export const initRoute = (app)=>{
    route.post('/',userController.createUser)
    return app.use('/',route)
}


