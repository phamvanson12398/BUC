
import { createData, deleteData, getAll, getOne, updateData } from "../models/myLibrary"
const table = 'versions'
const getAllVersion = async (req, res) => {
    try {
        const version = await getAll(table);
        if (version) {
            return res.status(200).json({
                message: "Get Data Success",
                data: version
            });
        }

    } catch (error) {
        return res.status(400).json({
            message: `Error : ${error.message}`
        });
    }

}

const getOneVersion = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await getOne(id, table);
        if (data) {
            return res.status(200).json({
                message: "Get Data Success",
                data: data
            });
        }

    } catch (error) {
        return res.status(400).json({
            message: `Error : ${error.message}`
        });
    }
}

const createVersion = async (req, res) => {

    const data = {
        version_name: req.body.version_name,
        type_file: req.body.type_file,
        modified: new Date(),
        total_size: req.body.total_size,
        description: req.body.description,
        device_id: req.body.device_id
    }
    try {
        await createData(table, data);

        const version = await getAll(table);
        return res.status(200).json({
            message: "create success",
            data: version
        })

    } catch (error) {
        return res.status(400).json({
            message: `Error : ${error.message}`
        })
    }

}

const deleteVersion = async (req, res) => {
    const id = req.params.id;
    try {
        await deleteData(id, table);

        const version = await getAll(table);
        return res.status(200).json({
            message: "Delete Data Success",
            data: version
        });


    } catch (error) {
        return res.status(400).json({
            message: `Error : ${error.message}`
        });
    }
}

const updateVersion = async (req, res) => {
    const id = req.params.id;
    const data = {
        version_name: req.body.version_name,
        type_file: req.body.type_file,
        modified: new Date(),
        total_size: req.body.total_size,
        description: req.body.description,
        device_id: req.body.device_id
    }
    try {
        await updateData(table, id, data);

        const version = await getAll(table);
        return res.status(200).json({
            message: "Delete Data Success",
            data: version
        });


    } catch (error) {
        return res.status(400).json({
            message: `Error : ${error.message}`
        });
    }
}
export default {
    getAllVersion,
    getOneVersion,
    createVersion,
    deleteVersion,
    updateVersion
}