import { createData, deleteData, getAll, getOne, updateData } from "../models/myLibrary"
const table = 'permissions'
 const getAllPromise= async (req,res)=>{
    try {
        const permissions = await getAll(table);
        return res.status(200).json({
            message:"Get Data Success",
            data:permissions[0]
        });
    } catch (error) {
        return res.status(500).json({
            message:"Get Data error",
            err:error
        });
    }
    
}

 const getOnePermisson = async (req,res)=>{
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

 const createPermission = async (req,res)=>{
    const data ={
        name:req.body.name,
        description : req.body.description
    }
    try {
         await createData(table,data);
        const permissions = await getAll(table);
        return res.status(200).json({
            message:"Create Data Success",
            data:permissions[0]
        });
    } catch (error) {
        return res.status(500).json({
            message:"Create Data error",
            err:error
        });
    }
}

 const deletePermission = async (req,res)=>{
    const id = req.params.id;
    try {
         await deleteData(id,table);
        const permissions = await getAll(table);
        return res.status(200).json({
            message:"Delete Data Success",
            data:permissions[0]
        });
    } catch (error) {
        return res.status(500).json({
            message:"Delete Data error",
            err:error
        });
    }
}

 const updatePermission = async (req,res)=>{
    const id = req.params.id;
    const data ={
        name:req.body.name,
        description : req.body.description
    }
    try {
        updateData(table,id,data);
        const permissions = await getAll(table);
        return res.status(200).json({
            message:"Delete Data Success",
            data:permissions[0]
        });
    } catch (error) {
        return res.status(500).json({
            message:"Update Data error",
            err:error
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