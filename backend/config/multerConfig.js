import multer from 'multer'

// Disk Storage 

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/Images')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    })

const upload = multer({ storage: storage });

export default upload;