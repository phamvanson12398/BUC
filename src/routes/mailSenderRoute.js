import express from "express";
import mailsenderController from "../controllers/mailsenderController";
import checkAuth from "../Middlewares/checkAuth";
import checkPermission from "../Middlewares/checkPermission";
const route = express.Router();

export const mailRoute = (app)=>{
    route
        .post('/sendmail/:id',checkAuth.checkLogin,mailsenderController.sendMail)
        .get('/', checkAuth.checkLogin, mailsenderController.getSender)
        .get('/:id', checkAuth.checkLogin, mailsenderController.getOneSender)
        .post('/create', checkPermission.checkAdmin, mailsenderController.createMailsender)
        .delete('/:id', checkPermission.checkAdmin, mailsenderController.deleteSender)
        .put('/:id', checkPermission.checkAdmin, mailsenderController.updateSender)
        return app.use('/sender',route)
}
