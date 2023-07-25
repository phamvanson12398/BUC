import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import ajv from "ajv"
 const authToken = (req,res,next)=>{
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
    
    if (!bearToken || !bearToken.startsWith('Bearer')) {
        return res.status(401).json({
            message: "You are not logged in"
        })
    }
    const token = bearToken.split(" ")[1]
    jwt.verify(token, process.env.SECRECT_ACCESS_TOKEN, (err, decode) => {
        if (err) {
            
            return res.status(401).json({ message: 'Invalid access token' });
        }
        else {
           req.user_id = decode.id;
          
           next()
        }
    })
}
const checkForm = (req,res,next)=>{
    const Ajv = new ajv();
     const authSchema = {
        type: "object",
        properties: {
          
          user_name: {
            type: "string",
          },
          password: {
            type: "string",
            minLength: 6,
            maxLength: 24,
          },
        },
        required: ["user_name", "password"],
        additionalProperties: false,
      };
    const data = req.body;

    const validate = Ajv.compile(authSchema);
    const check = validate(data)
    if(!check){
        return res.status(400).json({
            message:"Enter the correct user and the character must be longer than 8"
        })
    }else{
        next()
    }
}
export default {
    authToken,checkLogin,checkForm
}