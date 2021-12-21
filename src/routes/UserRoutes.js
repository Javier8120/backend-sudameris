const { Router } = require("express"); // seleccionar funcion Router de express
const userRoutes = Router(); 
const { userModel } = require("../models/AuthModels/userModel")
const { compare } = require("bcrypt"); // bcryptjs (algoritmot criptografico para generar claves hash unidireccionales)
const { sign } = require("jsonwebtoken");
const { userGuard } = require("../guard/userGuard");
//captura de el email / password / Ruta

userRoutes.post("/login", async function (req, res) {
    // Captura el email / password
    const { email, password } = req.body;
    // Buscar en BD el email
    const user = await userModel.findOne({ email });
    // Preguntar si existe el email
    if (!user) {
        return res.status(401).send({ estado: "error", msg: "Credenciales NO válidas" });
    }

    

        // Comparar el password bcrypt
    const passOK = await compare(password, user.password);
    if (passOK === true) {
        const token = sign(
            {
                email: user.email,
                rol: user.rol
            },
            process.env.JWT_SECRET_KEY
        )
        return res.status(200).send({ estado: "ok", msg: "Logueado :)",
        url:"/admin", token });
    }
    return res.status(401).send({ estado: "error", msg: "Credenciales NO válidas" });
});

userRoutes.post("/save", userGuard, function (req, res) {
    // Captura los datos
    const data = req.body;
    // Instancia el modelo y pobla con los datos
    const user = new userModel(data);
    // Guarda en BD
    user.save(function (error) {
        if (error) {
            return res.status(500).send({ estado: "error", msg: "ERROR: Usuario NO guardado" });
        }
        return res.status(200).send({ estado: "ok", msg: "Usuario guardado !" });
    });
    // Responde OK/Error
})

exports.userRoutes = userRoutes;