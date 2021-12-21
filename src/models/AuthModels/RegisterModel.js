const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Necesitamos el esquema

const RegisterSchema = new Schema({
  nombres:{
      type: "string",
      required: true
  },
  apellidos:{
    type: "string",
    required: true
},
  tipo_identificacion:{
    type: "string",
    required: true

},
  numero_identificacion:{
    type: "string",
    required: true,
    unique: true
},
  fecha_nacimiento:{
    type: "date",
    required: true
},
  fecha_expedicion:{
    type: "date",
    required: true
},
  valor_ingresos:{
    type: "string",
    required : true
},
  valor_egresos:{
    type: "string",
    required : true
},
  valor_matricula:{
    type: "string",
    required : true
},
  email:{
   type: "string",
   required : true,
   unique: true
},
password:{
  type: "string",
  required : true
},
rol: {
  type: "string",
  required: true
}

});
const RegisterModel = mongoose.model("registers",RegisterSchema); // Register es la coleccio nde la base de datos a la que me quiero conectar. 
exports.RegisterModel = RegisterModel;