const express = require('express');
const upload = require('../middlewares/imageUploads/upload')
const db = require('../models/index');
const FileUpload = db.FileUpload;
const router = express.Router();

router.post("/single", upload.single('image'), async (req, res) => {

    const uploadImg = FileUpload.build({
        image: req.file.path
    })

    const result = await uploadImg.save();
    if (result) {
        res.send("Single file uploaded successfully");
    } else {
        res.status(400).send("Please upload a valid image");
    }
});

module.exports = router;