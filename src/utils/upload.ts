import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 2 * 1024 * 1024;

const upload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    },
    fileFilter: (_req, file, cb: Function) => {
        // if (
        //     file.mimetype === "image/png" ||
        //     file.mimetype === "image/jpg" ||
        //     file.mimetype === "image/jpeg"
        // ) {
        //     cb(null, true);
        // } else {
        //     return cb("ERROR: INVALID_TYPE", false);
        // }

        // Set the filetypes, it is optional
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);

        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );

        if (mimetype && extname) {
            cb(null, true);
        } else {
            return cb(new Error("INVALID_TYPE"), false);
        }
    }
}).single("file");

export default upload;
