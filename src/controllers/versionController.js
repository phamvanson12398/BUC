
import { createData, deleteData, getAll, getOne, updateData } from "../models/myLibrary"
const table = 'versions'
 const getAllVersion= async (req,res)=>{
    try {
        const version = await getAll(table);
        if(version){
            return res.status(200).json({
            message:"Get Data Success",
            data:version[0]
        });
        }
        
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
        if(data){
            return res.status(200).json({
            message:"Get Data Success",
            data:data
        });
        }
        
    } catch (error) {
        return res.status(500).json({
          message:`Get Data error:${error}`
        });
    }
}

 const createVersion = async (req,res)=>{

   const data ={
    version_name : req.body.version_name,
    type_file:req.body.type_file,
    modified : new Date(),
    total_size : req.body.total_size,
    description:req.body.description,
    device_id :req.body.device_id
   }
       try {
        const create = await createData(table,data);
        if(create){
            const version = await getAll(table);
            return res.status(200).json({
                message:"create success",
                data:version[0]
            })
        }
       } catch (error) {
        return res.status(500).json({
            message:"create error",
            
        })
       }
      
}

 const deleteVersion = async (req,res)=>{
    const id = req.params.id;
    try {
        const del= await deleteData(id,table);
        if(del){
            const version = await getAll(table);
        return res.status(200).json({
            message:"Delete Data Success",
            data:version[0]
        });
        }
        
    } catch (error) {
        return res.status(500).json({
            message:"Delete Data error",
           
        });
    }
}

 const updateVersion = async (req,res)=>{
    const id = req.params.id;
    const data ={
        version_name : req.body.version_name,
        type_file:req.body.type_file,
        modified : new Date(),
        total_size : req.body.total_size,
        description:req.body.description,
        device_id :req.body.device_id
       }
    try {
       const ud= updateData(table,id,data);
       if(ud){
        const version = await getAll(table);
        return res.status(200).json({
            message:"Delete Data Success",
            data:version[0]
        });
       }
        
    } catch (error) {
        return res.status(500).json({
            message:"Update Data error",
           
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