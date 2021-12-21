// el model es una funcion y el Schema es una esquema (estructura  plantilla que tendran los documentos
// que yo guarde en la coleccion User.) 

const {model, Schema} = require("mongoose")
const { genSalt, hash } = require("bcrypt");


const userSchema = new Schema({

    
    nombres:{ 
        type: "string",
        required: true
    },
    apellidos: {
        type: "string",
        required: true
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

userSchema.pre("save", async function (next) {
    const salt = await genSalt(+process.env.BCRYPT_ROUNDS);
    this.password = await hash(this.password, salt);
    next();
})

const userModel = model("users", userSchema);

exports.userModel = userModel;