import express from "express"
import checkAuth from "../Middlewares/checkAuth";
import checkPermission from "../Middlewares/checkPermission";
import deviceController from "../controllers/deviceController";
const route = express.Router();

export const deviceRoute = (app) => {
    route
        .get('/', checkAuth.checkLogin, deviceController.getAlldevice)
        .get('/:id', checkAuth.checkLogin, deviceController.getOneDevice)
        .post('/create', checkPermission.checkAdmin, deviceController.createDevice)
        .delete('/delete/:id', checkPermission.checkAdmin, deviceController.deleteDevice)
        .put('/:id', checkPermission.checkAdmin, deviceController.updateDevice)
    return app.use('/device', route)
}