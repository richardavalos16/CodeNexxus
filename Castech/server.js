const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const sesion = require('express-session');
const config = require('./config/Config')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
// CONTRASEÑA
jwtOptions.secretOrKey = 'proyectofinalpila'

const app = express();
const router = express.Router();
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// USO DE SESIONES
app.use(sesion({
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { httpOnly: false },
}));

app.use(passport.initialize());
app.use(passport.session())

// CONECTAR CON MONGODB (USO DE MONGOOSE
mongoose.connect(config.DB, function () {
    console.log('Conexión Exitosa');
})

    .catch(err => {
        console.error('Conexión Erronea', err.stack);
        process.exit(1);
    });

// INCLUIR CARPETA DE CONTROLADORES (REDES SOCIALES)
fs.readdirSync('controladores').forEach(function (archivo) {
    if (archivo.substr(-3) == ".js") {
        const ruta = require("./controladores/" + archivo);
        ruta.controller(app);
    }
});

// NOS PERMITE VOLVER A LA PAGINA ANTERIOR (ERROR CHECAR)
app.use(history());
app.use(serveStatic(__dirname + '/dist'));

// USUARIO
router.get('/usuario_actual', inicioSesion, function (req, res) {
    if (req.usuario) {
        res.send({ usuario_actual: req.usuario });
    } else {
        res.status(403).send({ success: false, msg: "Usuario Sin Registro" });
    }
});

// INICIAR SESION (ERROR CHECAR)
function inicioSesion(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
        res.redirect('/');
        console.log('¡Error! autenticación fallida')
    }
};

// SALIR DE LA SESION (ERROR CHECAR)
router.get('/logout', function (req, res) {
    req.logOut();
    res.send(); // RES.SEND;
});

// INICIO DE LA BASE DE DADOS
router.get('/', function (req, res) {
    res.json({ mensaje: 'Base de Datos Creada' });
});

// PUERTO --> DIRECCION EN LA QUE SE ESTA CORRIENDO 
const puerto = process.env.API_PORT || 27017;
app.use('/', router);
var server = app.listen(puerto, function () {
    console.log(`Corriendo en http://localhost:${puerto}`);
});

// SE EXPORTA EL SERVIDOR
module.exports = server;