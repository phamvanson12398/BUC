import express from "express"
import userController from "../controllers/userController";
import permissionController from "../controllers/permissionController";
import authController from "../controllers/authController";
import checkAuth from "../Middlewares/checkAuth";
import checkPermission from "../Middlewares/checkPermission";

let route = express.Router();

export const initRoute = (app)=>{
    route.get('/user',checkPermission.checkLogin,userController.getUser)
    route.get('/user/:id',checkPermission.checkLogin,userController.getOneUser)
    route.post('/user/create',checkPermission.checkAdmin,userController.createUser)
    route.delete('/user/delete/:id',checkPermission.checkAdminDelete,userController.deleteUser)
    route.put('/user/update/:id',checkPermission.checkAdmin,userController.updateUser)

    route.get('/permission',checkPermission.checkLogin,permissionController.getAllPromise)
    route.get('/permission/:id',checkPermission.checkLogin,permissionController.getOnePermisson)
    route.post('/permission/create',checkPermission.checkAdmin,permissionController.createPermission)
    route.delete('/permission/:id',checkPermission.checkAdmin,permissionController.deletePermission)
    route.put('/permission/:id',checkPermission.checkAdmin,permissionController.updatePermission)

    route.post('/refreshtk',checkAuth.authToken,authController.refreshToken)
    route.post('/login',checkAuth.checkForm,authController.login)
    
    return app.use('/',route)
}

export default initRoute


