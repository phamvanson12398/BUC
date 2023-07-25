import util from "util"
import path from "path"
import multer from "multer"

let storage = multer.diskStorage({
  
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../storage`));
  },
  filename: (req, file, callback) => {
    let filename = `${Date.now()}--${file.originalname}`;
    callback(null, filename);
  }
});
let uploadManyFiles = multer({storage: storage}).array("filename", 5);
let multipleUploadMiddleware = util.promisify(uploadManyFiles);
export default multipleUploadMiddleware