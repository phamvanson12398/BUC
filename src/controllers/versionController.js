
import uploadManyFiles from "../Middlewares/multipleUploadMiddleware"

let multipleUpload = async (req, res) => {
  try {
    
    await uploadManyFiles(req, res);
    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file or more.`);
    }
   console.log(req.files);
    return res.send(`Your files has been uploaded.`);
  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload many files: ${error}}`);
  }
};
export default multipleUpload