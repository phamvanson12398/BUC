import fs from "fs"
import http from "http"
import path from "path"
import multer from "multer"


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
    
      return callback(new Error('Only zip are allowed'));
  }
  callback(null, true); 
},}).single("filename");

      
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
export default {downloadFile,uploadFile
}