import express from "express"
import checkAuth from "../Middlewares/checkAuth";
import authController from "../controllers/authController"
const route = express.Router();

export const authRoute = (app) => {
    route
        .post('/refreshtk', checkAuth.authToken, authController.refreshToken)
        .post('/login', checkAuth.checkForm, authController.login)
        .post('/logout', checkAuth.checkLogin, authController.logout)

    return app.use('/', route)
}