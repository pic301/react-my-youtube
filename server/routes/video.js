const express = require('express');
const router = express.Router();
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

let storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads/")
    },
    filename: (req, file, cb) =>{
        cb(null, `${Date.now()}_${file.originalname}`)

    }, 
    fileFilter: (req, file, cb) =>{
        const ext = path.extname(file.originalname)
        if(!ext === '.mp4'){
            return cb(res.status(400).end('only mp4 is allowed'), false)
        }
        cb(null,true)
    }
})

const upload = multer({storage: storage}).single("file");

router.post('/uploadfiles',(req,res) =>{
   // 비디오 서버에 저장
   upload(req, res, err => {
       if(err){
           return res.json({ success: false, err})
       } 
       return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename})
   })
})


router.post("/thumbnail", (req, res) => {
 
    let thumbsFilePath ="";
    let fileDuration ="";

    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        console.dir(metadata);  
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })


    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            filePath = "uploads/thumbnails/" + filenames[0];
        }) 
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, url: filePath, fileDuration: fileDuration})
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size:'320x240',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });

});



module.exports = router