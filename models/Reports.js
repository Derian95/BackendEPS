const mongoose = require('mongoose');

const ReportsSchema = new mongoose.Schema({

    titulo:{
        type:String,
        required: true,
        trim: true
    },
    descripcion:{
        type:String,
        required: true,
        trim: true
    },
    latitud:{
        type:String,
        requerid:true
    },
    longitud:{
        type:String,
        requerid:true
    },
    foto:{
        type:String,
        requerid:true,
        trim: true
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    creado:{
        type:Date,
        default:Date.now()
    },
    estado:{
        type:String,
        default: "PENDIENTE"
    }
});

module.exports = mongoose.model('Reports', ReportsSchema);