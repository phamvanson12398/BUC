
import bcrypt from "bcrypt"
import { createData, getAll } from "../models/myLibrary"

export const getUser = (req,res)=>{
    const data = getAll('users');
    return data;
}
let hashPassword =  (password)=>{
    return bcrypt.hash(password,10,(err,hash)=>{
        if(!err){
            console.log(hash);
            return hash
        }else{
            
            console.log(err)
            return null;
        }
    })
}
export const createUser = async (req, res)=>{
const pass = hashPassword(req.body.password)
    let data ={
        'user_name':req.body.user_name,
        'password' : pass,
        'email' : req.body.email,
        'phone' : req.body.phone,
        'permission_id':req.body.permission_id
        // name : req.body.name,
        // description:req.body.description
    }
    console.log(data);
    try {
        const User = await createData('users',data);
        return res.status(201).json({
            message:"Created User success",
            data:User
        })
    } catch (error) {
        console.log(error)
    }
    return res.status(400).json({
        message:"Created User error",
       
    })
}


// let re = bcrypt.compare('123456','$2b$10$AnUJmBWPASfBziR/u8/v7u/JVPnUNWNqtDrWYZG35J0I9SRAQdeDK',(err,result)=>{
//     if(!err){
//         console.log('oke')
//     }
//     else{
//         console.log(err)
//     }
// })
export default {
    createUser,getUser
}
