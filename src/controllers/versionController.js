
import { createData, deleteData, getAll, getOne, updateData } from "../models/myLibrary"
const table = 'versions'
 const getAllVersion= async (req,res)=>{
    try {
        const version = await getAll(table);
        return res.status(200).json({
            message:"Get Data Success",
            data:version[0]
        });
    } catch (error) {
        return res.status(500).json({
            message:`Get Data error:${error}`
       
        });
    }
    
}

 const getOneVersion = async (req,res)=>{
    const id= req.params.id;
    try {
        const data = await getOne(id,table);
        return res.status(200).json({
            message:"Get Data Success",
            data:data
        });
    } catch (error) {
        return res.status(500).json({
          message:`Get Data error:${error}`
        });
    }
}

 const createVersion = async (req,res)=>{
   const data ={
    
   }
        console.log(req.file);
        return res.status(200).json({
          message:"success"
        })
      
}

 const deleteVersion = async (req,res)=>{
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

 const updateVersion = async (req,res)=>{
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
    getAllVersion,
    getOneVersion,
    createVersion,
    deleteVersion,
    updateVersion
}