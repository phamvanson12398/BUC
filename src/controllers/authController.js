import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import { checkUser, createData, deleteToken } from "../models/myLibrary"


const generateAccessToken = (id, permission_id) => {
    const token = jwt.sign({
        id: id,
        permission_id: permission_id
    }, process.env.SECRECT_ACCESS_TOKEN, { expiresIn: process.env.TIME_ACCESS_TOKEN })
    // console.log(token);
    return token;
}
const generateRefreshToken = (id) => {
    const token = jwt.sign({ id: id }, process.env.SECRECT_REFRESH_TOKEN)
    return token;
}

const refreshToken = (req, res) => {
    const access_token = generateAccessToken(req.user.id, req.user.permission_id)
    return res.status(200).json({
        message: "success",
        accessToken: access_token
    })
}



const login = async (req, res) => {
    try {
        const { user_name, password } = req.body;
        const user = await checkUser(user_name);
        if (user[0].password) {
            let comparePassword = await bcrypt.compare(password, user[0].password)
            if (comparePassword) {
                const Access_token = generateAccessToken(user[0].id, user[0].permission_id);
                const Refresh_token = generateRefreshToken(user[0].id);
                const reftoken = await createData('refTokens', { token: Refresh_token, user_id: user[0].id })
                const data = {
                    user_name: user[0].user_name,
                    email: user[0].email,
                    phone: user[0].phone,
                    permission_id: user[0].permission_id,
                    accessToken: Access_token,
                    reftoken: Refresh_token
                }
                if (reftoken) {
                    return res.status(200).json({
                        data: data
                    })
                }

            } else {
                return res.status(400).json({
                    message: "Password does not exist "
                })
            }

        }

    } catch (error) {

        return res.status(400).json({
            message: error.message
        })


    }

}
const logout = async (req, res) => {
    const user_id = req.user_id;
    try {
        await deleteToken(user_id);
        await createData('blacklist', { name: req.token })
        return res.status(300).json({
            message: "Logout Success"
        })
    } catch (error) {

        return res.status(400).json({
            message: error.message
        })
    }
}
export default {
    refreshToken, login, logout
}