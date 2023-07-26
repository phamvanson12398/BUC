

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

export default uploadFile