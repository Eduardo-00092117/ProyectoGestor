let mongoose = require("mongoose");

let filesSchema = mongoose.Schema({
    file : {
        type : String,
        required: true,   
    },
    tipoArchivo : String,
});

let File = module.exports= mongoose.model("File", filesSchema);