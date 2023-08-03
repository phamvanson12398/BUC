
import { createData, deleteData, getAll, getOne, updateData } from "../models/myLibrary";

const table = "mail_server"
const getServer = async (req, res) => {
    try {
        const data = await getAll(table);
        return res.status(200).json({
            messsage: "Get data success!",
            data: data
        })
    } catch (error) {
        return res.status(400).json({
            messsage: `${error}`
        })
    }
}
const getOneServer = async (req, res) => {
    const id = req.params.id;
    try {
        const dataOne = await getOne(id, table)
        return res.status(200).json({
            messsage: "Get data success",
            data: dataOne
        })
    } catch (error) {
        return res.status(400).json({
            messsage: `${error}`
        })
    }
}
const createMailServer = async (req, res) => {
    const data = {
        server_name: req.body.server_name,
        description: req.body.description
    }
    try {
        await createData(table, data);
        const dataAll = await getAll(table);
        return res.status(200).json({
            messsage: "Create success",
            data: dataAll
        })
    } catch (error) {
        return res.status(200).json({
            messsage: `${error}`
        })
    }
}
const updateServer = async (req, res) => {
    const id = req.params.id;
    const data = {
        server_name: req.body.server_name,
        description: req.body.description
    }
    try {
        await updateData(table, id, data)
        const dataAll = await getAll(table);
        return res.status(200).json({
            messsage: "Update success",
            data: dataAll
        })
    } catch (error) {
        return res.status(200).json({
            messsage: `${error}`
        })
    }
}
const deleteServer = async (req, res) => {
    const id = req.params.id;
    try {
        await deleteData(id, table)
        const dataAll = await getAll(table);
        return res.status(200).json({
            messsage: "Delete success",
            data: dataAll
        })
    } catch (error) {
        return res.status(200).json({
            messsage: `${error}`
        })
    }
}

export default { getServer, getOneServer, createMailServer, updateServer, deleteServer }