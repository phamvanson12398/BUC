import express from "express"
import userController from "../controllers/userController";
let route = express.Router();

export const initRoute = (app)=>{
    route.post('/',userController.createUser)
    return app.use('/',route)
}