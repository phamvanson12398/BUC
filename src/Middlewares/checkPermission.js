import jwt from "jsonwebtoken"
import { getOne } from "../models/myLibrary";
const table = 'users';

const checkAdmin = (req,res,next)=>{
    const bearToken = req.header('Authorization');
    
    if (!bearToken || !bearToken.startsWith('Bearer')) {
        return res.status(401).json({
            message: "Bạn chưa đăng nhập"
        })
    }
    const token = bearToken.split(" ")[1]
    jwt.verify(token, process.env.SECRECT_ACCESS_TOKEN, (err, decode) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ message: 'Invalid access token' });
        }
        else {
            if(decode.permission_id == 1 || decode.permission_id == 2  ){
                req.user= decode
                next()
            }
            else{
               return res.status(403).json({
                message:'Ban khong co quyen truy cap!'
               })
            }
            
        }
    })
}
const checkAdminDU =async (req,res,next)=>{
    const bearToken = req.header('Authorization');
    const id = req.params.id;
    const userCheck = await getOne(id,table);
    if (!bearToken || !bearToken.startsWith('Bearer')) {
        return res.status(401).json({
            message: "Bạn chưa đăng nhập"
        })
    }
    const token = bearToken.split(" ")[1]
    jwt.verify(token, process.env.SECRECT_ACCESS_TOKEN, (err, decode) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ message: 'Invalid access token' });
        }
        else {
            
            if(decode.permission_id < userCheck[0].permission_id ){
                req.user= decode
                next()
            }
            else{
               return res.status(403).json({
                message:'Bạn không có quyền thực hiện hành động vơí user này'
               })
            }
            
        }
    })
}


    
export default {checkAdmin,checkAdminDU
}