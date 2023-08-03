import express from "express"
import permissionController from "../controllers/permissionController";
import checkPermission from "../Middlewares/checkPermission";
import checkAuth from "../Middlewares/checkAuth";
const route = express.Router();

export const permissionRoute = (app) => {
    route
        .get('/', checkAuth.checkLogin, permissionController.getAllPromise)
        .get('/:id', checkAuth.checkLogin, permissionController.getOnePermisson)
        .post('/create', checkPermission.checkAdmin, permissionController.createPermission)
        .delete('/delete/:id', checkPermission.checkAdmin, permissionController.deletePermission)
        .put('/:id', checkPermission.checkAdmin, permissionController.updatePermission)
    return app.use('/permission', route)
}