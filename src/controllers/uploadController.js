import fs from "fs"
import stream from "stream";
import { checkFile, createData, deleteData, getAll, getFileVersion, getOne } from "../models/myLibrary";
const table = 'files'


const getAllFiles = async (req, res) => {
  try {
    const files = await getAll(table);

    return res.status(200).json({
      message: "Get Data Success",
      data: files
    });


  } catch (error) {
    return res.status(400).json({
      message: `Error : ${error.message}`
    });
  }

}

const getFilevs = async (req, res) => {
  const id = req.params.id;
  try {
    const file = await getFileVersion(id);

    return res.status(200).json({
      message: "success",
      data: file
    })

  } catch (error) {
    return res.json({
      message: `Error : ${error.message}`
    })
  }
}
const getOneFile = async (req, res) => {
  const filename = req.params.id;
  try {
    const file = await getOne(filename, table);

    return res.status(200).json({
      message: "success",
      data: file
    })

  } catch (error) {
    return res.status(400).json({
      message: `Error : ${error.message}`
    })
  }
}
const addFile = async (req, res) => {
  const data = {
    name: req.file.filename,
    type_file: req.file.mimetype,
    content: new Date(),
    path: req.file.path,
    version_id: req.body.version_id
  }
  try {
    await createData(table, data)

    const files = await getAll(table);
    return res.status(200).json({
      message: "success",
      data: files
    })

  } catch (error) {
    return res.status(400).json({
      message: `Error : ${error.message}`
    })
  }
}

const downloadFile = async (req, res) => {
  const filename = req.params.filename;
  const file = await checkFile(filename);
  const data = fs.readFileSync(file[0].path);
  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', 'application/zip');
  const readStream = new stream.PassThrough();
  readStream.end(data);
  readStream.pipe(res);
  readStream.on('error', (error) => {
    if (error) {
      res.status(400);
      res.end('Download file Error');
    }
  });
}
const deleteFile = async (req, res) => {
  const id = req.params.id;
  try {
    await deleteData(id, table);
    const file = await getOne(id, table)
    const filePath = file[0].path; // Lấy đường dẫn file cần xóa từ query parameter
    // Sử dụng fs.unlink để xóa file
    fs.unlink(filePath, (err) => {
      if (err) {
        throw new Error('Lỗi khi xóa file');
      } else {
        console.log('Xóa file thành công:', filePath);
        res.status(200).json({
          message: 'Xóa file thành công'
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      message: `Error : ${error.message}`
    })
  }
}
export default {
   addFile, getAllFiles, getFilevs, getOneFile, downloadFile, deleteFile
}