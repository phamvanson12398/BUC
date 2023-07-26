import fs from "fs"
import http from "http"
import path from "path"
import multer from "multer"
import { createData, getAll } from "../models/myLibrary";
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
  fileSize: 15000000000
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
      return res.status(500).json({
          message:`Get Data error: ${error} `
      });
  }
  
}


const addFile = async (req,res)=>{
  const data ={
    name: req.file.filename,
    type_file:req.file.mimetype,
    content :new Date(),
    path : `http://localhost:3001/file/${req.file.filename}`,
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
    return res.status(500).json({
      message:` error: ${error} `
    })
  }
console.log(req.file);
  return res.status(200).json({
    
  })
}   
 const updateFile = async (req,res)=>{
  // them thuoc tinh duong dan cua file đe xoa fil khi da update
  const data ={
    name: req.file.filename,
    type_file:req.file.mimetype,
    content :new Date(),
    path : `http://localhost:3001/file/${req.file.filename}`,
    version_id : req.body.version_id
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
export default {downloadFile,uploadFile,addFile,getAllFiles
}