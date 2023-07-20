import { render } from "ejs"
import bcrypt from "bcrypt"
const getUser = (req,res)=>{
    return res.render('index',{data:hashPassword})
}

let hashPassword = bcrypt.hash('123456',10,(err,hash)=>{
    if(!err){
        console.log(hash)
    }else{
        console.log(err)
    }
})
let re = bcrypt.compare('123456','$2b$10$AnUJmBWPASfBziR/u8/v7u/JVPnUNWNqtDrWYZG35J0I9SRAQdeDK',(err,result)=>{
    if(!err){
        console.log('oke')
    }
    else{
        console.log(err)
    }
})
export default {
    getUser
}