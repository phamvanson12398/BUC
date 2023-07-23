import jwt from "jsonwebtoken"
import dotenv from "dotenv"
export const authToken = (req,res,next)=>{
    const tokenBearer = req.header('Authorization')
    if(!tokenBearer || !tokenBearer.startsWith("Bearer")){
        return res.status(401).json({
            message:"Bearer Token missing"
        })
    }
   const token = tokenBearer.split(" ")[1]
    jwt.verify(token,process.env.SECRECT_REFRESH_TOKEN,(err,decode)=>{
        if(err){
            console.log(err);
            return res.status(401).json({
                message:"token missing"
            })
        }
        else{
            req.user = decode;
            
            next()
        }
    })
}

const checkLogin = (req,res,next)=>{
    const bearToken = req.header('Authorization');
    console.log(bearToken);
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
           next()
        }
    })
}
export default {
    authToken,checkLogin
}