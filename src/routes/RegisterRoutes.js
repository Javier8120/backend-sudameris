const { Router } = require("express");
const RegisterRoutes = Router();
const { RegisterModel } = require("../models/AuthModels/RegisterModel");
const { ObjectId } = require("mongoose");






//listar 
RegisterRoutes.post("/listar", function (req, res) {
    RegisterModel.find({}, function (error, prod) {
        if (error) {
            return res.send({ estado: "error", msg: "Error al buscar el registro" })
        } else {
            if (prod !== null) {
                res.send({ estado: "ok", msg: "Clientes encontrados" })
            } else {
                res.send({ estado: "error", msg: "Clientes no encontrados" })
            }
        }
    })
})

// Api Rest: Verbo, ruta, endPoint

/**
 * API Rest Guardar Solicitud de credito
 * Descripción: Guarda los clientes solicitantes de creditos nuevos en la base datos
 * Ruta: /guardar
 * Método: POST
 * Datos de entrada: ****
 * Respuesta: {estado: "ok", msg: "Producto Guardado!"}
 */

RegisterRoutes.post("/guardar", function (req, res) {

    const data = req.body;
    if (data.identificacion !== null && data.identificacion !== "") {
        RegisterModel.updateOne({ _id: data.identificacion }, {
            $set: {

                nombres: data.nombres,
                apellidos: data.apellidos,
                tipo_identificacion: data.tipo_identificacion,
                fecha_nacimiento: data.nacimiento,
                fecha_expedicion: data.expedicion,
                valor_ingresos: data.ingresos,
                valor_egresos: data.egresos,
                valor_matricula: data.matricula,
                email: data.email,
                password: data.password,
                rol: data.rol

            }
        },
            function (error) {
                if (error) {
                    console.log(error)
                    return res.status(500).json({ estado: "error", msg: "ERROR: NO Guardado!" })
                }
                res.status(200).json({ estado: "ok", msg: "Guardado!" })
            })
    } else {
        const {
            nombres,
            apellidos,
            tipo_identificacion,
           
            nacimiento,
            expedicion,
            ingresos,
            egresos,
            matricula,
            email,
            password,
            rol
        } = data;
        const datos = {
            nombres,
            apellidos,
            tipo_identificacion,
            
            nacimiento,
            expedicion,
            ingresos,
            egresos,
            matricula,
            email,
            password,
            rol
        
        };
        const prod = new RegisterModel(datos);
        prod.save(function (error) {
            if (error) {
                res.send({ estado: "error", msg: "ERROR: NO Guardado :(" });
                return false;
            }
            res.send({ estado: "ok", msg: " Guardado!" });
        })
    }
});



exports.RegisterRoutes = RegisterRoutes