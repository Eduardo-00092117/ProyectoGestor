const express = require('express');
const router = express.Router();
//var Imagen = require("./models/imagenes");
//Requerimos el controlador que hemos creado
const AuthController = require("../controllers/UserController");
//Requerimos el Middelware que hemos creado
const AuthMiddleware = require("../middlewares/AuthMiddleware")
//Requerimos el modelo
const User = require("../models/users");

//Devolvera el formulario 1 de cambiar contraseña
router.get('/pedirClave',AuthController.formClave);
//Devolvera el formulario 2 de cambiar contraseña
router.get('/pedirCorreo',AuthController.formCorreo);
//Devolvera el formulario 3 de cambiar contraseña
router.get('/cambiarContra',AuthController.formContra);

//ruta que nos devolvera el formulario para crear usuarios
router.get('/inicioNormal',AuthController.inicio);

//ruta que nos devolvera el formulario para crear usuarios
router.get('/registrar',AuthController.create);
//ruta que enviara los datos del usuario para almacenarlos en la base de datos
router.post('/signup',AuthController.store);

//ruta que nos devolvera el formulario para ingresar
router.get('/login',AuthController.login);
//ruta que enviara los datos del usuario para ingresar al sistema
router.post('/signin',AuthController.signin);
//ruta para salir del sistema
router.get('/logout',AuthController.logout);
/*Middlewar que verifica que solo los usuarios registrados podran ingresar a esta seccion */
router.use(AuthMiddleware.isAuthentication);
//ruta para acceder al perifl
router.get('/inicioNormal',AuthController.profile);
//Imagenes
router.route("/imagenes").get(function(req,res){
    Imagen.find({creator:res.locals.user_id},function(err,imagenes){
        if(err){res.redirect("/app");return;}
        res.render("app/imagenes/index",{imagenes:imagenes});
    });
}).post(function(req,res){
    console.log(req.body.archivo);
    var data = {
        title:req.body.title,
        creator:res.locals.user._id
    }
    var imagen = new Imagen(data);
    imagen.save(function(err){
        if(!err){
            fs.rename(req.body.archivo.path,"public/img")
            res.redirect("app/imagenes"+imagen._id)
        }
        else{
            res.render(err);
        }
    });
});

module.exports = router;
