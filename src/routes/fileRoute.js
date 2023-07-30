import express from "express"
import checkPermission from "../Middlewares/checkPermission";
import checkAuth from "../Middlewares/checkAuth";
import uploadController from "../controllers/uploadController";
let route = express.Router();
export const fileRoute = (app) => {
    route
        .post('/upload',checkPermission.checkAdmin ,uploadController.uploadFile, uploadController.addFile)
        .get('/',checkAuth.checkLogin, uploadController.getAllFiles)
        .get('/:id',checkAuth.checkLogin, uploadController.getFilevs)
        .post('/download/:filename',checkAuth.checkLogin, uploadController.downloadFile)
    return app.use('/file', route)
}



