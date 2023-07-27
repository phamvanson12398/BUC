import express from "express"
import userController from "../controllers/userController";
import permissionController from "../controllers/permissionController";
import authController from "../controllers/authController";
import checkAuth from "../Middlewares/checkAuth";
import checkPermission from "../Middlewares/checkPermission";
import deviceController from "../controllers/deviceController";
import uploadController from "../controllers/uploadController";
import versionController from "../controllers/versionController";
import path from "path"
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


    route.get('/device',checkAuth.checkLogin,deviceController.getAlldevice)
    route.get('/device/:id',checkAuth.checkLogin,deviceController.getOneDevice)
    route.post('/device/create',deviceController.createDevice)
    route.delete('/device/delete/:id',checkPermission.checkAdmin,deviceController.deleteDevice)
    route.put('/device/:id',checkPermission.checkAdmin,deviceController.updateDevice)

    route.get('/version',checkAuth.checkLogin,versionController.getAllVersion)
    route.get('/version/:id',checkAuth.checkLogin,versionController.getOneVersion)
    route.post('/version/create',versionController.createVersion)
    route.delete('/version/delete/:id',checkPermission.checkAdmin,versionController.deleteVersion)
    route.put('/version/:id',checkPermission.checkAdmin,versionController.updateVersion)


    route.post('/upfile',uploadController.uploadFile,uploadController.addFile)
    route.get('/file',uploadController.getAllFiles)
    route.get('/file/:id',uploadController.getFilevs)
    route.post('/download',uploadController.downloadFile)
    app.get('/api/download', (req, res) => {
        const filename = '1690441758017--ollllld.zip';
        const filePath = './storage/1690441758017--ollllld.zip'; // Thay đổi đường dẫn tới thư mục chứa các tệp
      console.log(filePath);
        // Sử dụng phương thức res.download để gửi lại tệp cho người dùng
        res.download(filePath, (err) => {
          if (err) {
            // Xử lý lỗi nếu không thể tìm thấy hoặc tải xuống tệp
            console.error('Error while downloading file:', err);
            res.status(404).json({ error: 'File not found' });
          }
        });
      });
      
    route.post('/refreshtk',checkAuth.authToken,authController.refreshToken)
    route.post('/login',checkAuth.checkForm,authController.login)
    route.post('/logout',checkAuth.checkLogin,authController.logout)
    route.use('*',(req,res)=>{
        return res.status(404).json({
            message:"Not found URL"
        })
    })
    return app.use('/',route)
}

export default initRoute


