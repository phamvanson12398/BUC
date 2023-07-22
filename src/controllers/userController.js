
import bcrypt from "bcrypt"
import { createData, deleteData, getAll, getOne, updateData } from "../models/myLibrary"
const table = "users";
export const getUser = async (req,res)=>{
    try {
        const User = await getAll('users');
        return res.status(200).json({
            message:"Get Data Success",
            data:User[0]
        });
    } catch (error) {
        return res.status(500).json({
            message:"Get Data error",
    })
}
}
const getOneUser = async (req,res)=>{
    const id = req.params.id;
    try {
        const User = await getOne(id,table);
        return res.status(201).json({
            message:"Get Data Success",
            data:User[0]
        })
    } catch (error) {
        return res.status(500).json({
            message:"Get Data error",
            
        })
    }
}
let hashPassword = async (password)=>{
  try {
    const pass =await  bcrypt.hash(password,10)
    return pass;
  } catch (error) {
     console.log(error)
  }
}
export const createUser = async (req, res)=>{
    const pd = await hashPassword(req.body.password);
    let data ={
        user_name:req.body.user_name,
        password : pd,
        email: req.body.email,
        phone : req.body.phone,
        permission_id:req.body.permission_id
    }
    console.log(data);
    try {
         await createData(table,data);
        const User = await getAll('users');
        return res.status(201).json({
            message:"Created User success",
            data:User[0]
        })
    } catch (error) {
        console.log(error)
    }
    return res.status(400).json({
        message:"Created User error",
       
    })
}
const deleteUser = async (req,res)=>{
    const id = req.params.id;
    try {
        await deleteData(id,table);
    const user = await getAll(table);
    return res.status(301).json({
        message:"Delete Success",
        data:user[0]
    })
    } catch (error) {
        return res.status(500).json({
            message:"Delete error"
        })
    }
}

const updateUser = async (req,res)=>{
    const id = req.params.id;
    const pd = await hashPassword(req.body.password);
    let data ={
        user_name:req.body.user_name,
        password : pd,
        email: req.body.email,
        phone : req.body.phone,
        permission_id:req.body.permission_id
    }
    try {
        await updateData(table,id,data)
    const user = await getAll(table);
        return res.status(200).json({
            message:"Update Data Success",
            data:user[0]
        })
    } catch (error) {
        return res.status(200).json({
            message:"Update Data error",
          
        })
    }
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
    createUser,getUser,getOneUser,deleteUser,updateUser
}
