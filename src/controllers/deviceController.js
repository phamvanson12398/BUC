import { createData, deleteData, deleteFile, deleteVersion, getAll, getOne, updateData } from "../models/myLibrary"
import ajv from "ajv"
const table = 'devices'
const getAlldevice = async (req, res) => {
    try {
        const devices = await getAll(table);
        return res.status(200).json({
            message: "Get Data Success",
            data: devices
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error : ${error.message}`
        });
    }

}

const getOneDevice = async (req, res) => {
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

const createDevice = async (req, res) => {
    const Ajv = new ajv();
    const authSchema = {
        type: "object",
        properties: {
            device_name: {
                type: "string",
            },
        },
        required: ["device_name"]
    };


    const validate = Ajv.compile(authSchema);

    const data = {
        device_name: req.body.device_name
    }
    const check = validate(data)
    if (!check) {
        return res.status(400).json({
            message: `${validate.errors[0].message}`
        })
    }
    try {
        await createData(table, data);
        const device = await getAll(table);


        return res.status(200).json({
            message: "Create Data Success",
            data: device
        });


    } catch (error) {
        return res.status(400).json({
            message: `Error : ${error.message}`

        });
    }
}

const deleteDevice = async (req, res) => {
    const id = req.params.id;
    try {
        await deleteData(id, table);
        const device = await getAll(table);
        return res.status(200).json({
            message: "Delete Data Success",
            data: device
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error : ${error.message}`
        });
    }
}

const updateDevice = async (req, res) => {
    const Ajv = new ajv();
    const authSchema = {
        type: "object",
        properties: {
            device_name: {
                type: "string",
            },
        },
        required: ["device_name"]
    };


    const validate = Ajv.compile(authSchema);

    const data = {
        device_name: req.body.device_name
    }
    const check = validate(data)
    if (!check) {
        return res.status(400).json({
            message: `${validate.errors[0].message}`
        })
    }
    const id = req.params.id;

    try {
        updateData(table, id, data);
        const device = await getAll(table);
        return res.status(200).json({
            message: "Delete Data Success",
            data: device
        });
    } catch (error) {
        return res.status(400).json({
            message: `Error : ${error.message}`
        });
    }
}
export default {
    getAlldevice,
    getOneDevice,
    createDevice,
    deleteDevice,
    updateDevice
}