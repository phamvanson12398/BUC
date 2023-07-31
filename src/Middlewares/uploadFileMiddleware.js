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
   let uploadFile = multer({
    storage: storage, limits: {
      //10mb
      fileSize: 10 * 1024 * 1024
    },
    fileFilter: async function (req, file, callback) {
      const ext = path.extname(file.originalname);
      if (ext !== '.zip') {
  
        return callback(new Error('Chỉ cho phép tải lên tệp zip!'));
      }
      callback(null, true);
    },
  }).single('filename');
  
 const loi = ((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
      // Xử lý lỗi do Multer (ví dụ: tệp quá lớn)
      res.status(400).json({ error: "File too large" });
    } else if (err) {
      // Xử lý các lỗi khác (ví dụ: lỗi do fileFilter)
      res.status(400).json({ error: err.message });
    } else {

      // Nếu không có lỗi, chuyển sang middleware tiếp theo
      next();
    }
  });


  export default {uploadFile,loi}