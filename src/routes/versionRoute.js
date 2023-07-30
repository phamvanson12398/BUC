import express from "express"
import checkAuth from "../Middlewares/checkAuth";
import checkPermission from "../Middlewares/checkPermission";
import versionController from "../controllers/versionController";

const route = express.Router();

export const versionRoute = (app) => {
    route
        .get('/', checkAuth.checkLogin, versionController.getAllVersion)
        .get('/:id', checkAuth.checkLogin, versionController.getOneVersion)
        .post('/create', checkPermission.checkAdmin, versionController.createVersion)
        .delete('/delete/:id', checkPermission.checkAdmin, versionController.deleteVersion)
        .put('/:id', checkPermission.checkAdmin, versionController.updateVersion)
        .use('*', (req, res) => {
            return res.status(404).json({
                message: "Not found URL"
            })
        })
    return app.use('/version', route)
}