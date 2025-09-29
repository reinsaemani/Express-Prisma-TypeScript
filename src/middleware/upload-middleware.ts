import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { NIK } = req.body;
    if (!NIK) return cb(new Error("NIK is required"), "");

    // path dasar storage/uploads/applicants
    const uploadPath = path.join(__dirname, "../../storage/uploads/applicants", NIK);

    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}${ext}`); // contoh: cv.pdf, id_card.png
  },
});

export const uploadDocuments = multer({ storage }).fields([
  { name: "cv", maxCount: 1 },
  { name: "id_card", maxCount: 1 },
  { name: "certificate", maxCount: 1 },
  { name: "photo", maxCount: 1 },
]);
