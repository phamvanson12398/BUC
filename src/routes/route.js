import express from "express"
import userController from "../controllers/userController";
let route = express.Router();

export const initRouteUser = (app)=>{
    route.post('/create',userController.createUser)
    route.delete('/delete/:id',userController.deleteUser)
    route.get('/',userController.getUser)
    route.get('/:id',userController.getOneUser)
    route.put('/update/:id',userController.updateData)
    return app.use('/user',route)
}