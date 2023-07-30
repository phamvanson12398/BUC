import jwt from "jsonwebtoken"
import { checkToken, getOne } from "../models/myLibrary";
const table = 'users';

const checkAdmin = async (req, res, next) => {
    const bearToken = req.header('Authorization');

    try {
        if(!bearToken){
            throw new Error("Bạn chưa đăng nhập!")
        }
        const token = bearToken.split(" ")[1]
        await checkToken(token);
        if (!bearToken || !bearToken.startsWith('Bearer')) {
            return res.status(401).json({
                message: "Bạn chưa đăng nhập"
            })
        }

        jwt.verify(token, process.env.SECRECT_ACCESS_TOKEN, async (err, decode) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid access token' });
            }
            else {

                const user = await getOne(decode.id,'users')
            
                if (user[0].permission_id == 1 || user[0].permission_id == 2) {
                    req.user = user
                    next()
                }
                else {
                    return res.status(403).json({

                        message: 'Ban khong co quyen truy cap!'
                    })
                }

            }
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}
//check quyen update , delete
const checkAdminDU = async (req, res, next) => {
    const bearToken = req.header('Authorization');

    try {
        if(!bearToken){
            throw new Error("Bạn chưa đăng nhập!")
        }
        const token = bearToken.split(" ")[1]
        await checkToken(token);
        const id = req.params.id;
        const userCheck = await getOne(id, table);
        if (!bearToken || !bearToken.startsWith('Bearer')) {
            return res.status(401).json({
                message: "Bạn chưa đăng nhập"
            })
        }

        jwt.verify(token, process.env.SECRECT_ACCESS_TOKEN, (err, decode) => {
            if (err) {
                console.log(err);
                return res.status(401).json({ message: 'Invalid access token' });
            }
            else {

                if (decode.permission_id < userCheck[0].permission_id) {
                    req.user = decode
                    next()
                }
                else {
                    return res.status(403).json({
                        message: 'Bạn không có quyền thực hiện hành động vơí user này'
                    })
                }

            }
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}



export default {
    checkAdmin, checkAdminDU
}