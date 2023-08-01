import express from "express"
import checkPermission from "../Middlewares/checkPermission";
import checkAuth from "../Middlewares/checkAuth";
import uploadController from "../controllers/uploadController";
import uploadFileMiddleware from "../Middlewares/uploadFileMiddleware";

let route = express.Router();
export const fileRoute = (app) => {
    route
        .post('/upload',checkPermission.checkAdmin ,uploadFileMiddleware.uploadFile,uploadFileMiddleware.loi,uploadController.addFile)
        .get('/',checkAuth.checkLogin, uploadController.getAllFiles)
        .get('/:id',checkAuth.checkLogin, uploadController.getFilevs)
        .post('/download/:filename',checkAuth.checkLogin, uploadController.downloadFile)
        .delete('/:id',checkPermission.checkAdmin ,uploadController.deleteFile)
    return app.use('/file', route)
}



