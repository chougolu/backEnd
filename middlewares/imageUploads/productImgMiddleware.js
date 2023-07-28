const multer = require('multer');

const productImgUpload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads');
        },
        filename : function(req,file,cb){
            cb(null, file.fieldname + "_" + Date.now() + '.jpg');
        }
    })
}).single("productImg");

module.exports = productImgUpload;