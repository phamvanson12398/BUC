import fs from "fs"
import http from "http"
import path from "path"
import multer from "multer"
import { createData, getAll, getOne, updateData } from "../models/myLibrary";
const table= 'files'

let storage = multer.diskStorage({
  
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../storage`));
  },
  filename: (req, file, callback) => {
    let filename = `${Date.now()}--${file.originalname}`;
    callback(null, filename);
  }
});
let uploadFile = multer({storage: storage,limits: {
  fileSize: 14000000000
},
fileFilter: async function (req, file, callback) {
  const ext = path.extname(file.originalname);
  if( ext !== '.zip') {
    
      return callback(req.err = 'Only zip are allowed');
  }
  callback(null, true); 
},}).single("filename");

const getAllFiles= async (req,res)=>{
  try {
      const files = await getAll(table);
      if(files){
        return res.status(200).json({
          message:"Get Data Success",
          data:files[0]
      });
      }
      
  } catch (error) {
      return res.status(400).json({
          message:`Get Data error: ${error} `
      });
  }
  
}

const getOneFile= async (req,res)=>{
  const id = req.params.id;
  try {
    const file = await getOne(id,table);
    if(file){
      return res.status(200).json({
        message:"success",
        data:file[0]
      })
    }
  } catch (error) {
    return res.json({
      message:"eorror"
    })
  }
}
const addFile = async (req,res)=>{
  const data ={
    name: req.file.filename,
    type_file:req.file.mimetype,
    content :new Date(),
    path : req.file.path,
    version_id : req.body.version_id
  }
  try {
    const ul = await createData(table,data)
    if(ul){
      const files = await getAll(table);
      return res.status(200).json({
        message:"success",
        data:files[0]
      })
    }
  } catch (error) {
    return res.status(400).json({
      message:` error: ${error} `
    })
  }
}   
 const updateFile = async (req,res)=>{
  const id = req.params.id;
  const file = await getOne(id,table);
  console.log(file[0]);
  if(file){
    if(req.file){
      fs.unlink(file[0].path, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
        console.log('File deleted successfully.');
      });
    
      res.send('File uploaded successfully.');
      const data ={
        name: req.file.filename,
        type_file:req.file.mimetype,
        content :new Date(),
        path : req.file.path,
        version_id : req.body.version_id
      }
    }
    console.log(req.file);
    }
    try {
      const ud =  await updateData(table,id,data);
      if(ud){
        const files = await getAll(table);
        return res.status(201).json({
          message:"success",
          data:files[0]
        })
      }
    } catch (error) {
      return res.status(400).json({
        message:"error"
      })
    }
  }
    
  
  
  
 



const downloadFile = (req,res)=>{
    const fileUrl = '/home/longbt/Desktop/BUC/BUC/src/storage/1690339554551--NIPS.zip';
    const downloadPath = './file-to-download.txt'; // Đường dẫn tới nơi lưu tập tin sau khi tải về

const file = fs.createWriteStream(downloadPath);

http.get(fileUrl, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close(() => {
      console.log('Tập tin đã được tải về thành công.');
    });
  });
}).on('error', (err) => {
  fs.unlink(downloadPath, () => {
    console.error('Đã xảy ra lỗi khi tải về:', err);
  });
});
}
export default {downloadFile,uploadFile,addFile,getAllFiles,getOneFile,updateFile
}