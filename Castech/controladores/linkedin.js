const Usuario = require('../modelos/Usuario');
const passport = require('passport');
const config = require('./../config/Config');
const Estrategia = require('passport-linkedin-oauth2').Strategy;

module.exports.controller = (app) => {
  // estrategia linkedin
  passport.use(new Estrategia({
    clientID: config.LINKEDIN_APP_ID,
    clientSecret: config.LINKEDIN_APP_SECRET,
    callbackURL: '/login/linkedin/return',
    profileFields: ['id', 'first-name', 'last-name', 'email-adress'],
  }, (tokenAcceso, refreshToken, perfil, cb) => {
    // Manejar login con linkedin
    const email = perfil.email;
    Usuario.obtenerUsuarioporEmail(email, (err, usuario) => {
      if (!usuario) {
        const nuevoUsuario = new Usuario({
          nombre: perfil.displayName,
          email: email,
          idExterno: perfil.id,
        });
        Usuario.crearUsuario(nuevoUsuario, (error) => {
          if (error) {
            // Manejar error
          } else {
            return cb(null, usuario);
          }
        });
      } else {
        return cb(null, usuario);
      }
      return true;
    });
  }));

  app.get('/login/linkedin', passport.authenticate('linkedin'));

  app.get('/login/linkedin/return', passport.authenticate('linkedin', {failureRedirect: '/login'}), (req, res) => {
    res.redirect('/');
  });
};