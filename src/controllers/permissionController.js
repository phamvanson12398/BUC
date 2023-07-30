import { createData, deleteData, getAll, getOne, updateData } from "../models/myLibrary"
const table = 'permissions'
const getAllPromise = async (req, res) => {
    try {
        const permissions = await getAll(table);
        return res.status(200).json({
            message: "Get Data Success",
            data: permissions
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error : ${error.message}`
        });
    }

}

const getOnePermisson = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await getOne(id, table);
        return res.status(200).json({
            message: "Get Data Success",
            data: data
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error : ${error.message}`
        });
    }
}

const createPermission = async (req, res) => {
    const data = {
        name: req.body.name,
        description: req.body.description
    }
    try {
        await createData(table, data);
        const permissions = await getAll(table);

        
            return res.status(200).json({
                message: "Create Data Success",
                data: permissions
            });
        

    } catch (error) {
        return res.status(400).json({
            message: `Error : ${error.message}`
        });
    }
}

const deletePermission = async (req, res) => {
    const id = req.params.id;
    try {
        await deleteData(id, table);
        const permissions = await getAll(table);
        return res.status(200).json({
            message: "Delete Data Success",
            data: permissions
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error : ${error.message}`
        });
    }
}

const updatePermission = async (req, res) => {
    const id = req.params.id;
    const data = {
        name: req.body.name,
        description: req.body.description
    }
    try {
        await updateData(table, id, data);
        const permissions = await getAll(table);
        
        return res.status(200).json({
            message: "Update Data Success",
            data: permissions
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error : ${error}`
        });
    }
}
export default {
    getAllPromise,
    getOnePermisson,
    createPermission,
    deletePermission,
    updatePermission
}