
import nodemailer from "nodemailer"
import { createData, deleteData, getAll, getOne, updateData } from "../models/myLibrary";

const table = 'mail_sender';
const sendMail = async (req, res) => {
    const { email, password } = req.body;
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        port: 25,
        auth: {
            user: email,
            //aibtwhbjxbowaoax
            pass: password
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
            messsage:`error:${error.messsage}`
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
            messsage:`error:${error.messsage}`
        })
    }
}
const createMailsender = async (req, res) => {
    const data = {
        email: req.email,
        password: req.password,
        server_id: req.server_id
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
            messsage: `error:${error.messsage}`
        })
    }
}
const updateSender = async (req,res)=>{
    const id = req.params.id;
    const data = {
        email: req.email,
        password: req.password,
        server_id: req.server_id
    }
    try {
        await updateData(table,id,data)
        const dataAll = await getAll(table);
        return res.status(200).json({
            messsage: "Update success",
            data:dataAll
        })
    } catch (error) {
        return res.status(200).json({
            messsage: `error:${error.messsage}`
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
            messsage: `error:${error.messsage}`
        })
    }
}
export default {
    sendMail, createMailsender,getSender,getOneSender,updateSender,deleteSender
}