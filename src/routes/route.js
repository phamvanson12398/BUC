import express from "express"
import userController from "../controllers/userController";
import permissionController from "../controllers/permissionController";
let route = express.Router();

export const initRouteUser = (app)=>{
    route.post('/user/create',userController.createUser)
    route.delete('/user/delete/:id',userController.deleteUser)
    route.get('/user',userController.getUser)
    route.get('/user/:id',userController.getOneUser)
    route.put('/user/update/:id',userController.updateUser)


    route.post('/permission/create',permissionController.createPermission)
    route.delete('/permission/delete/:id',permissionController.deletePermission)
    route.get('/permission',permissionController.getAllPromise)
    route.get('/permission/:id',permissionController.getOnePermisson)
    route.put('/permission/update/:id',permissionController.updatePermission)


    return app.use('',route)
}


