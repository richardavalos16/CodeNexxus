const Usuario = require('../modelos/Usuario');

const passport = require('passport');
const EstrategiaLocal = require('passport-local').Strategy; 
// const passportJWT = require('passport-jwt');
// const jwt = require('jsonwebtoken');
// const passport = require('passport');

// const ExtractJwt = passportJWT.ExtractJwt;
// const jwtOptions = {};
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
// jwtOptions.secretOrKey = 'estaeslaclavesecretaporfavornocompartirla';

module.exports.controller = (app) => {
    // Estrategia local
    passport.use(new EstrategiaLocal({
        campoNombreUsuario: 'email',
        campoContrasenha: 'contrasenha',
    }, (email, contrasenha, hecho) => {
        Usuario.obtenerUsuarioporEmail(email, (err, usuario) => {
            if (err) {return hecho(err);}
            else if (!usuario) {return hecho(null, false);}
            else {
                Usuario.compararContrasenhas(contrasenha, usuario.contrasenha, 
                    (error, coincide) => {
                        if(coincide) {
                            return hecho(null, usuario);
                        } else {
                            return hecho(null, false);
                        }
                    });
                    return true;
            }
        });
    }));
    // Registrar un usuario
    app.post('/usuarios/registro', (req, res) => {
        const nombre = req.body.nombre;
        const email = req.body.email;
        const contrasenha = req.body.contrasenha;
        const nuevoUsuario = new Usuario ({
            nombre,
            email,
            contrasenha,
        });
        Usuario.crearUsuario(nuevoUsuario, (error, usuario) => {
            if (error) {
                console.log(error);
                res.status(422).json({
                    mensaje: 'Algo salió mal, por favor intentelo nuevamente después de unos minutos',
                });
            }
            else {
                res.send({usuario});
            }
        });
    });

    // Inicio de sesión
    app.post('/usuarios/login', passport.authenticate('local', {failureRedirect: '/usuarios/login'}), (req, res) => {
        // res.redirect('/');
        
        if (req.body.email && req.body.contrasenha) {
            const email = req.body.email;
            const contrasenha = req.body.contrasenha;
            Usuario.obtenerUsuarioporEmail(email, (err, usuario) => {
                if (! usuario) {
                    res.status(404).json({mensaje: '¡El usuario no existe!'});
                } else {
                    Usuario.compararContrasenhas(contrasenha, usuario.contrasenha, 
                        (error, coincide) => {
                            if (error) throw error;
                            else if (coincide) {
                                const payload = { id: usuario.id };
                                const token = jwt.sign(payload, jwtOptions.secretOrKey);
                                res.json({ mensaje: 'ok', token });
                            } else {
                                res.status(401).json({mensaje: '¡Contraseña incorrecta!'});
                            }
                        });
                }
            });
        }
    });
    
    passport.serializeUser((usuario, hecho) => {
        hecho(null, usuario.id);
    });

    passport.deserializeUser((id, hecho) => {
        Usuario.findById(id, (err, usuario) => {
            hecho(err, usuario);
        });
    });
};