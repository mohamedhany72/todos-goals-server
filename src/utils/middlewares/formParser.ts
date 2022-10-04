import path from "path";
import formData from "express-form-data";

const options = {
    uploadDir: path.join(__dirname, "..", "..", "temp"),
    autoClean: true
};

const formParser = formData.parse(options);

export default formParser;
