import express from "express"
import userController from "../controllers/userController";
import permissionController from "../controllers/permissionController";
let route = express.Router();

export const initRoute = (app)=>{
    route.get('/user',userController.getUser)
    route.get('/user/:id',userController.getOneUser)
    route.post('/user/create',userController.createUser)
    route.delete('/user/delete/:id',userController.deleteUser)
    route.put('/user/update/:id',userController.updateUser)

    route.get('/permission',permissionController.getAllPromise)
    route.get('/permission/:id',permissionController.getOnePermisson)
    route.post('/permission/create',permissionController.createPermission)
    route.delete('/permission/:id',permissionController.deletePermission)
    route.put('/permission/:id',permissionController.updatePermission)

    return app.use('/',route)
}

export default initRoute


