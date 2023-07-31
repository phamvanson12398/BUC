import ajv from "ajv"
import nodemailer from "nodemailer"
import { createData, deleteData, getAll, getOne, updateData } from "../models/myLibrary";

const table = 'mail_sender';
const sendMail = async (req, res) => {
    const id = req.params.id;
   try {
    const sender = await getOne(id,table)
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        port: 25,
        auth: {
            user: sender[0].email,
            //aibtwhbjxbowaoax
            pass: sender[0].password
        }
    });

    const mailOption = {
        from: "phamvanson2303@gmail.com",
        to: "sonpvph27505@fpt.edu.vn",
        subject: "BKAV",
        text: "Hello guy"
    };

    await transporter.sendMail(mailOption, (error, info) => {
        if (error) {
            return res.status(400).json({
                messsage: `Error sending email:${error}`
            });
        } else {
            console.log('Email sent:', info.response);
            return res.status(200).json({
                messsage: `Email sent: ${info.response}`
            });
        }
    })
   } catch (error) {
    return res.status(400).json({
        message:`${error}`
    })
   }
}

const getSender = async (req, res) => {
    try {
        const data = await getAll(table);
        return res.status(200).json({
            messsage: "Get data success!",
            data: data
        })
    } catch (error) {
        return res.status(400).json({
            messsage:`${error}`
        })
    }
}
const getOneSender = async (req,res)=>{
    const id = req.params.id;
    try {
        const dataOne = await getOne(id,table)
        return res.status(200).json({
            messsage:"Get data success",
            data : dataOne
        })
    } catch (error) {
        return res.status(400).json({
            messsage:`${error}`
        })
    }
}
const createMailsender = async (req, res) => {
    const Ajv = new ajv();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    Ajv.addFormat('email', emailRegex)
    const authSchema = {
        type: "object",
        properties: {
            email: {
                type: "string",
                format:'email'
            },
        },
        required: ["email"]
    };
    

    const validate = Ajv.compile(authSchema);
   
    
    
    const data = {
        email: req.body.email,
        password: req.body.password,
        server_id: req.body.server_id
    }
    const check = validate(data)
    if (!check) {
        return res.status(400).json({
            message: `${validate.errors[0].message}`
        })
    }
    try {
        await createData(table, data);
        const dataAll = await getAll(table);
        return res.status(200).json({
            messsage: "Create success",
            data:dataAll
        })
    } catch (error) {
        return res.status(200).json({
            messsage: `${error}`
        })
    }
}
const updateSender = async (req,res)=>{
    const Ajv = new ajv();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    Ajv.addFormat('email', emailRegex)
    const authSchema = {
        type: "object",
        properties: {
            email: {
                type: "string",
                format:'email'
            },
        },
        required: ["email"]
    };
    
    const validate = Ajv.compile(authSchema);
    const data = {
        email: req.body.email,
        password: req.body.password,
        server_id: req.body.server_id
    }
    const check = validate(data)
    if (!check) {
        return res.status(400).json({
            message: `${validate.errors[0].message}`
        })
    }
    const id = req.params.id;
    try {
        await updateData(table,id,data)
        const dataAll = await getAll(table);
        return res.status(200).json({
            messsage: "Update success",
            data:dataAll
        })
    } catch (error) {
        return res.status(200).json({
            messsage: `${error}`
        })
    }
}
const deleteSender = async (req,res)=>{
    const id = req.params.id;
    try {
        await deleteData(id,table)
        const dataAll = await getAll(table);
        return res.status(200).json({
            messsage: "Delete success",
            data:dataAll
        })
    } catch (error) {
        return res.status(200).json({
            messsage: `${error}`
        })
    }
}
export default {
    sendMail, createMailsender,getSender,getOneSender,updateSender,deleteSender
}