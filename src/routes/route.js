import express from "express"
import userController from "../controllers/userController";
import permissionController from "../controllers/permissionController";
import authController from "../controllers/authController";
import checkAuth from "../Middlewares/checkAuth";

let route = express.Router();

export const initRoute = (app)=>{
    route.get('/user',checkAuth.checkLogin,userController.getUser)
    route.get('/user/:id',checkAuth.checkLogin,userController.getOneUser)
    route.post('/user/create',checkAuth.checkLogin,userController.createUser)
    route.delete('/user/delete/:id',checkAuth.checkLogin,userController.deleteUser)
    route.put('/user/update/:id',checkAuth.checkLogin,userController.updateUser)

    route.get('/permission',checkAuth.checkLogin,permissionController.getAllPromise)
    route.get('/permission/:id',checkAuth.checkLogin,permissionController.getOnePermisson)
    route.post('/permission/create',checkAuth.checkLogin,permissionController.createPermission)
    route.delete('/permission/:id',checkAuth.checkLogin,permissionController.deletePermission)
    route.put('/permission/:id',checkAuth.checkLogin,permissionController.updatePermission)

    route.post('/refreshtk',checkAuth.authToken,authController.refreshToken)
    route.post('/login',authController.login)
    
    return app.use('/',route)
}

export default initRoute


