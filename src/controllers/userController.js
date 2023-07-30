
import bcrypt from "bcrypt"
import { createData, deleteData, getAll, getOne, updateData } from "../models/myLibrary"
const table = "users";
export const getUser = async (req, res) => {
    try {
        const User = await getAll(table);
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
        return res.status(201).json({
            message: "Get Data Success",
            data: User
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
    let data = {
        user_name: req.body.user_name,
        password: pd,
        email: req.body.email,
        phone: req.body.phone,
        permission_id: req.body.permission_id
    }
    try {

        await createData(table, data);
        let User = await getAll(table);
        for (let i = 0; i < User[0].length; i++) {
            delete User[0][i].password;
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

}
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await deleteData(id, table);
        const user = await getAll(table);
        return res.status(301).json({
            message: "Delete Success",
            data: user[0]
        })
    } catch (error) {
        return res.status(400).json({
            message: `Error : ${error.message}`
        })
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id;
    const pd = await hashPassword(req.body.password);
    let data = {
        user_name: req.body.user_name,
        password: pd,
        email: req.body.email,
        phone: req.body.phone,
        permission_id: req.body.permission_id
    }
    try {
        await updateData(table, id, data)
        const user = await getAll(table);
        return res.status(200).json({
            message: "Update Data Success",
            data: user
        })
    } catch (error) {
        return res.status(200).json({
            message: `Error : ${error.message}`

        })
    }
}


export default {
    createUser, getUser, getOneUser, deleteUser, updateUser
}
