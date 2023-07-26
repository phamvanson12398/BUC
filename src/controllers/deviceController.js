import { createData, deleteData, getAll, getOne, updateData } from "../models/myLibrary"
const table = 'devices'
 const getAlldevice= async (req,res)=>{
    try {
        const devices = await getAll(table);
        return res.status(200).json({
            message:"Get Data Success",
            data:devices[0]
        });
    } catch (error) {
        return res.status(500).json({
            message:"Get Data error",
            err:error
        });
    }
    
}

 const getOneDevice = async (req,res)=>{
    const id= req.params.id;
    try {
        const data = await getOne(id,table);
        return res.status(200).json({
            message:"Get Data Success",
            data:data
        });
    } catch (error) {
        return res.status(500).json({
            message:"Get Data error",
            err:error
        });
    }
}

 const createDevice = async (req,res)=>{
    const data ={
        device_name:req.body.device_name
    }
    try {
        const create = await createData(table,data);
        const device = await getAll(table);
        
        if(create){
            return res.status(200).json({
                message:"Create Data Success",
                data:device[0]
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            message:"Create Data error",
            
        });
    }
}

 const deleteDevice = async (req,res)=>{
    const id = req.params.id;
    try {
         await deleteData(id,table);
        const device = await getAll(table);
        return res.status(200).json({
            message:"Delete Data Success",
            data:device[0]
        });
    } catch (error) {
        return res.status(500).json({
            message:"Delete Data error",
            err:error
        });
    }
}

 const updateDevice = async (req,res)=>{
    const id = req.params.id;
    const data ={
        device_name:req.body.device_name,
        
    }
    try {
        updateData(table,id,data);
        const device = await getAll(table);
        return res.status(200).json({
            message:"Delete Data Success",
            data:device[0]
        });
    } catch (error) {
        return res.status(500).json({
            message:"Update Data error",
            err:error
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