import Multer from "multer";
import path from "path";

Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = Multer({ dest: path.join(process.cwd(), "/uploads") });

export { upload };
