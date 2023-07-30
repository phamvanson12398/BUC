import express from "express";
import mailServerController from "../controllers/mailServerController";
import checkAuth from "../Middlewares/checkAuth";
import checkPermission from "../Middlewares/checkPermission";
const route = express.Router();

export const mailServerRoute = (app)=>{
    route
        .get('/', checkAuth.checkLogin, mailServerController.getServer)
        .get('/:id', checkAuth.checkLogin, mailServerController.getOneServer)
        .post('/create', checkPermission.checkAdmin, mailServerController.createMailServer)
        .delete('/delete/:id', checkPermission.checkAdmin, mailServerController.deleteServer)
        .put('/:id', checkPermission.checkAdmin, mailServerController.updateServer)
        return app.use('/server',route)
}
