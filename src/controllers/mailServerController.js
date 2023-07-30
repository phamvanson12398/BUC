
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
            messsage: `error:${error.messsage}`
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
            messsage: `error:${error.messsage}`
        })
    }
}
const createMailServer = async (req, res) => {
    const data = {
        name: req.name,
        description: req.description
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
            messsage: `error:${error.messsage}`
        })
    }
}
const updateServer = async (req, res) => {
    const id = req.params.id;
    const data = {
        name: req.name,
        description: req.description
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
            messsage: `error:${error.messsage}`
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
            messsage: `error:${error.messsage}`
        })
    }
}

export default { getServer, getOneServer, createMailServer, updateServer, deleteServer }