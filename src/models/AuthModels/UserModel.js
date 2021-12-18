// el model es una funcion y el Schema es una esquema (estructura  plantilla que tendran los documentos
// que yo guarde en la coleccion User.) 

const {model, Schema} = require("mongoose")
const UserSchema = new Schema({

    
    nombres:{ 
        type: "string",
        
    },
    apellidos: {
        type: "string",
       
    },
    email: {
        type: "string",
        required: true,
        unique: true
    }, 
    password: {
        type: "string",
        required: true,
        min: 6,
        max: 20
    },
    rol: {
        type: "string",
        required: true
    }

});

const UserModel = model("user", UserSchema); // User es la coleccio nde la base de datos a la que me quiero conectar. 
exports.UserModel = UserModel;