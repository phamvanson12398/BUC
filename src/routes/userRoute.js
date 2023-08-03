import express from "express"
import userController from "../controllers/userController";
import checkAuth from "../Middlewares/checkAuth";
import checkPermission from "../Middlewares/checkPermission";
const route = express.Router()

export const userRouter = (app) => {
    route
        .get('/', checkAuth.checkLogin, userController.getUser)
        .get('/:id', checkAuth.checkLogin, userController.getOneUser)
        .post('/create', checkPermission.checkAdmin, userController.createUser)
        .delete('/delete/:id', checkPermission.checkAdminDU, userController.deleteUser)
        .put('/update/:id', checkPermission.checkAdminDU, userController.updateUser)
    return app.use('/user', route)
}
