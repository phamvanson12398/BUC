import express from "express"
import userController from "../controllers/userController";
import permissionController from "../controllers/permissionController";
import authController from "../controllers/authController";
import checkAuth from "../Middlewares/checkAuth";
import checkPermission from "../Middlewares/checkPermission";
import multer from "multer"
// import { upfile } from "../controllers/versionController";

let route = express.Router();

export const initRoute = (app)=>{
    route.get('/user',checkAuth.checkLogin,userController.getUser)
    route.get('/user/:id',checkAuth.checkLogin,userController.getOneUser)
    route.post('/user/create',checkPermission.checkAdmin,userController.createUser)
    route.delete('/user/delete/:id',checkPermission.checkAdminDU,userController.deleteUser)
    route.put('/user/update/:id',checkPermission.checkAdminDU,userController.updateUser)

    route.get('/permission',checkAuth.checkLogin,permissionController.getAllPromise)
    route.get('/permission/:id',checkAuth.checkLogin,permissionController.getOnePermisson)
    route.post('/permission/create',checkPermission.checkAdmin,permissionController.createPermission)
    route.delete('/permission/delete/:id',checkPermission.checkAdmin,permissionController.deletePermission)
    route.put('/permission/:id',checkPermission.checkAdmin,permissionController.updatePermission)
    route.post('/upfile',(req,res,next)=>{
        const  storage = multer.diskStorage({
            destination: function (req, file, cb) {
              cb(null, 'uploads')
            },
            filename: function (req, file, cb) {
              cb(null, file.fieldname + '-' + Date.now())
            }
          })
           
          multer({ storage: storage }).single("myfile")
          next()
    } , (req, res,next) => {
        const file = req.file
        console.log(req.file);
        if (!file) {
          const error = new Error('Please upload a file')
          error.httpStatusCode = 400
          return next("khoong load dc")
        }
        res.send(file)
      })
    
     
    route.post('/refreshtk',checkAuth.authToken,authController.refreshToken)
    route.post('/login',checkAuth.checkForm,authController.login)
    route.post('/logout',checkAuth.checkLogin,authController.logout)
    return app.use('/',route)
}

export default initRoute


