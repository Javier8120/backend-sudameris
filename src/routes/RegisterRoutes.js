const { Router } = require("express");
const RegisterRoutes = Router();
const { RegisterModel } = require("../models/AuthModels/RegisterModel");
const { ObjectId } = require("mongoose");

  

// Api Rest: Verbo, ruta, endPoint

/**
 * API Rest Guardar Solicitud de credito
 * Descripción: Guarda los clientes solicitantes de creditos nuevos en la base datos
 * Ruta: /guardar
 * Método: POST
 * Datos de entrada: ****
 * Respuesta: {estado: "ok", msg: "Producto Guardado!"}
 */

RegisterRoutes.post("/guardar", function (req, res){

    const data = req.body;
    if (data._id !== null && data._id !== "") {
        RegisterModel.updateOne({ _id: data._id }, { $set: { 
            
            nombres: data.nombres, 
            apellidos: data.apellidos, 
            tipo_identificacion: data.tipo_identificacion,
            numero_identificacion: data.numero_identificacion,
            fecha_nacimiento: data.fecha_nacimiento,
            fecha_expedicion: data.fecha_expedicion,
            valor_ingresos: data.valor_ingresos,
            valor_egresos: data.valor_egresos,
            valor_matricula: data.valor_matricula,
            email: data.email,
            password: data.password,
            rol: "cliente"    
        
        } },
            function (error) {
                if (error) {
                console.log(error)
                return res.status(500).json({ estado: "error", msg: "ERROR: Producto NO Guardado!" })
            }
            res.status(200).json({ estado: "ok", msg: "Producto Guardado!" })
        })
    } else {
        const {  
            nombres,
            apellidos,
            tipo_identificacion,
            numero_identificacion,
            fecha_nacimiento,
            fecha_expedicion,
            valor_ingresos,
            valor_egresos,
            valor_matricula,
            email,
            password,
            rol } = data;
        const datos = { 
            nombres,
            apellidos,
            tipo_identificacion,
            numero_identificacion,
            fecha_nacimiento,
            fecha_expedicion,
            valor_ingresos,
            valor_egresos,
            valor_matricula,
            email,
            password,
            rol};
        const prod = new productosModel(datos);
        prod.save(function (error) {
            if (error) {
                res.send({ estado: "error", msg: "ERROR: NO Guardado :(" });
                return false;
            }
            res.send({ estado: "ok", msg: " Guardado!" });
        })
    }
});


//listar 
RegisterRoutes.post("/listar", function (req, res){
    RegisterModel.find({}, function (error, prod){
    if(error){ 
        return res.send({estado: "error", msg: "Error al buscar el registro"})
    } else {
        if (prod !== null) {
            res.send({estado: "ok", msg: "Clientes encontrados"})
        } else {
            res.send({estado: "error", msg: "Clientes no encontrados"})
        }
      }
    })
})

exports.RegisterRoutes = RegisterRoutes