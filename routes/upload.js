var express = require('express');
var fs = require('fs');
const upload = require("../controllers/Storage");
const File = require("../models/files");
var router = express.Router();

router.post("/inicioNormal", (req, res, next)=>{
    upload(req, res, function (err) {
        if(req.file == null || req.file == undefined || req.file == ""){         
            res.redirect("/drive/inicioNormal");
        }
        else{
            if (err) {
                console.log(err);
            }
            else{
                console.log(req.file);
                let file = new File();
                file.file = req.file.filename;
                file.tipoArchivo = req.file.filename.split('.').pop();
                file.save(()=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        res.redirect("/drive/inicioNormal");
                    }
                });
            }
        }
    }); 
});

module.exports = router;