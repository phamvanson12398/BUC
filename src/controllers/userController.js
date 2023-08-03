import ajv from "ajv"
import bcrypt from "bcrypt"
import { createData, deleteData, getAll, getOne, updateData } from "../models/myLibrary"
const table = "users";
export const getUser = async (req, res) => {
    try {
        const User = await getAll(table);
        for (let i = 0; i < User.length; i++) {
            delete User[i].password;
        }
        return res.status(200).json({
            message: "Get Data Success",
            data: User
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error : ${error.message}`,
        })
    }
}
const getOneUser = async (req, res) => {
    const id = req.params.id;
    try {
        const User = await getOne(id, table);
        delete User[0].password;
        return res.status(201).json({
            message: "Get Data Success",
            data: User[0]
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error : ${error.message}`

        })
    }
}
let hashPassword = async (password) => {
    try {
        const pass = await bcrypt.hash(password, 10)
        return pass;
    } catch (error) {
        console.log(error)
    }
}
export const createUser = async (req, res) => {
    const pd = await hashPassword(req.body.password);
    const Ajv = new ajv();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    Ajv.addFormat('email', emailRegex)
    const phoneRegex = /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/;
    Ajv.addFormat('phone', phoneRegex)
    const authSchema = {
        type: "object",
        properties: {
            user_name: {
                type: "string",
                minLength:1
            },
            password: {
                type: "string",
                minLength: 6
            },
            email: {
                type: "string",
                format: 'email'
            },
            phone: {
                type: "string",
                format: 'phone'
            },
            permission_id: {
                type: 'string'
            }

        },
        
        
    };


    const validate = Ajv.compile(authSchema);
    if(req.user.id < req.body.permission_id ){
        let data = {
            user_name: req.body.user_name,
            password: pd,
            email: req.body.email,
            phone: req.body.phone,
            permission_id: req.body.permission_id
        }
        const check = validate(data)
        if (!check) {
            return res.status(400).json({
                message: `error:${validate.errors[0].instancePath} - ${validate.errors[0].message}`
            })
        }
        try {

            await createData(table, data);
            let User = await getAll(table);
            for (let i = 0; i < User.length; i++) {
                delete User[i].password;
            }
            return res.status(201).json({
                message: "Created User success",
                data: User
            })
    
        } catch (error) {
            return res.status(400).json({
                message: `Error : ${error.message}`
            })
        }
    }else{
        return res.status(400).json({
            message:"Khong duoc tao nguoi cung cap va hon cap"
        })
    }
    
    

}
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await deleteData(id, table);
        const User = await getAll(table);
        for (let i = 0; i < User.length; i++) {
            delete User[i].password;
        }
        return res.status(301).json({
            message: "Delete Success",
            data: User
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error : ${error.message}`
        })
    }
}

const updateUser = async (req, res) => {
    const Ajv = new ajv();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    Ajv.addFormat('email', emailRegex)
    const phoneRegex = /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/;
    Ajv.addFormat('phone', phoneRegex)
    const authSchema = {
        type: "object",
        properties: {
            user_name: {
                type: "string",
            },
            password: {
                type: "string",
                minLength: 6
            },
            email: {
                type: "string",
                format: 'email'
            },
            phone: {
                type: "string",
                format: 'phone'
            },
            permission_id: {
                type: 'string'
            }

        },
        required: [ 'user_name', 'password', 'email', 'phone', 'permission_id' ]
        
    };
    const validate = Ajv.compile(authSchema);
    
    const id = req.params.id;
    const pd = await hashPassword(req.body.password);
    let data = {
        user_name: req.body.user_name,
        password: pd,
        email: req.body.email,
        phone: req.body.phone,
        permission_id: req.body.permission_id
    }
    const check = validate(data)
    if (!check) {
        return res.status(400).json({
            message: `error:${validate.errors[0].instancePath} - ${validate.errors[0].message}`
        })
    }
    try {
        await updateData(table, id, data)
        const User = await getAll(table);
        for (let i = 0; i < User.length; i++) {
            delete User[i].password;
        }
        return res.status(200).json({
            message: "Update Data Success",
            data: User
        })
    } catch (error) {
        return res.status(200).json({
            message: `Error : ${error.message}`

        })
    }
}
export default {
    createUser, getUser, getOneUser, deleteUser, updateUser,hashPassword
}
