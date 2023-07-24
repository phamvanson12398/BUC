import multer from "multer";




export const upfile = async (req,res,next)=>{
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          return (null, 'storage/') // Lưu trữ file trong thư mục 'uploads/'
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + '-' + file.originalname); // Đặt tên file dựa trên thời gian và tên gốc của file
        }
      });
      
      // Tạo một middleware upload
      const upload = multer({ storage: storage });
        const file = upload.single('filename')
    console.log(storage);
    console.log(upload);      
    console.log(file);

} //đặt ở route

