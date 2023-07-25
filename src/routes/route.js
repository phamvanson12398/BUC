import express from "express"
import userController from "../controllers/userController";
import permissionController from "../controllers/permissionController";
import authController from "../controllers/authController";
import checkAuth from "../Middlewares/checkAuth";
import checkPermission from "../Middlewares/checkPermission";

import multipleUpload from "../controllers/versionController";

let route = express.Router();

export const initRoute = (app)=>{
    route.get('/users',checkAuth.checkLogin,userController.getUser)
    route.get('/user/:id',checkAuth.checkLogin,userController.getOneUser)
    route.post('/user/create',checkPermission.checkAdmin,userController.createUser)
    route.delete('/user/delete/:id',checkPermission.checkAdminDU,userController.deleteUser)
    route.put('/user/update/:id',checkPermission.checkAdminDU,userController.updateUser)

    route.get('/permission',checkAuth.checkLogin,permissionController.getAllPromise)
    route.get('/permission/:id',checkAuth.checkLogin,permissionController.getOnePermisson)
    route.post('/permission/create',checkPermission.checkAdmin,permissionController.createPermission)
    route.delete('/permission/delete/:id',checkPermission.checkAdmin,permissionController.deletePermission)
    route.put('/permission/:id',checkPermission.checkAdmin,permissionController.updatePermission)
    route.post('/upload',multipleUpload)
    route.post('/refreshtk',checkAuth.authToken,authController.refreshToken)
    route.post('/login',checkAuth.checkForm,authController.login)
    route.post('/logout',checkAuth.checkLogin,authController.logout)
    route.use('*',(req,res)=>{
        return res.status(404).json({
            message:"Không tìm thấy địa chỉ"
        })
    })
    return app.use('/',route)
}

export default initRoute


