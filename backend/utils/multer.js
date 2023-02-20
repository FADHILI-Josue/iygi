import multer from 'multer';

const storage = multer.memoryStorage()

const multerUploads = multer({storage: storage, limits:{}})


export { multerUploads }

// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname)
//   },
//   expires: function (req, file, cb) {
//     cb(null, Date.now() + 24 * 60 * 60 * 1000) // Expires after 24 hours
//   }
// });

// const upload = multer({ storage: storage });
