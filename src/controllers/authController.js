import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import { checkUser } from "../models/myLibrary"


const generateAccessToken = (user_name,email,phone, permission_id) => {
    const token = jwt.sign({
        user_name: user_name,
        email:email,
        phone:phone,
        permission_id: permission_id
    }, process.env.SECRECT_ACCESS_TOKEN, { expiresIn: "4m" })
    // console.log(token);
    return token;
}
const generateRefreshToken = () => {
    const token = jwt.sign({}, process.env.SECRECT_REFRESH_TOKEN, { expiresIn: "30d" })
    return token;
}

const refreshToken = (req, res) => {

    const access_token = generateAccessToken(req.user.user_name, req.user.permission_id)
    return res.status(200).json({
        message: "success",
        accessToken: access_token
    })
}



const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await checkUser(email);
        if (user[0].password) {
            let comparePassword = await bcrypt.compare(password, user[0].password)
            if (comparePassword) {
                const Access_token = generateAccessToken(user[0].user_name,user[0].email,user[0].phone, user[0].permission_id);
                // console.log(Access_token);
                const Refresh_token = generateRefreshToken();
                return res.status(200).json({
                    access_token: Access_token,
                    refresh_token: Refresh_token,
                    data:user[0]
                })
            }else{
                return res.status(400).json({
                    message: "Invalid password "
                })
            }
        }

    } catch (error) {
       
        return res.status(400).json({
            message: "Invalid email "
        })

       
    }

}

export default {
 refreshToken, login
}