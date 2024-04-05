//multer.js
const multer = require('multer')
const{v4:uuidv4}=require('uuid')
const path = require('path')




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
     const unique=uuidv4()

      cb(null,unique +path.extname(file.originalname));
    }
  })
  
  const upload = multer({ storage: storage })
  module.exports=upload;
  













//   Multer is a Node.js middleware for handling multipart/form-data requests, which is primarily used for uploading files. It is built on top of the busboy package, which provides a way to parse multipart form data.

// Multer adds a file or files object to the request object, which contains the files uploaded by the user. You can access the uploaded files using the req.file or req.files properties.

// The storage option in Multer allows you to specify how and where the uploaded files should be stored. There are two built-in storage engines in Multer: memory and disk. The memory storage engine stores the uploaded files in memory, while the disk storage engine stores the uploaded files on disk.

// In the provided context, Multer is used to handle file uploads and store them in the '/tmp/my-uploads' directory on the server. The filename function in the diskStorage configuration generates a unique filename for each uploaded file by concatenating the fieldname, a hyphen, and a random unique suffix. This ensures that each uploaded file has a unique name, preventing any potential naming conflicts.

// In the provided context, the uuidv4() function from the uuid package is used to generate a unique identifier for each uploaded file. This ensures that each uploaded file has a unique name, preventing any potential naming conflicts.