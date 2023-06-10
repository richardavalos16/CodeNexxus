const EsquemaVideojuego = require('../modelos/Videojuego');
const Calificacion = require('../modelos/Calificacion');
const passport = require('passport');

module.exports.controller = (app) => {
// Obtener todos los Videojuegos
  app.get('/videojuego', function (req, res) {
    EsquemaVideojuego.find({}, 'nombre descripcion genero desarrolladora',
      (error, videojuegos) => {
                if (error) {
                    console.error(error);
                    res.send(error);
                }
                else {
                    res.send({
                        videojuegos,
                    });
                }
            });
    });
    // Obtener un solo videojuego
    app.get('/videojuego/:id', (req, res) => {
        EsquemaVideojuego.findById(req.params.id, 'nombre descripcion genero desarrolladora',
            (error, videojuego) => {
                if (error) { console.error(error); }
                else {
                    res.send(videojuego);
                }
            })
    });

    //Calificar videojuego
    app.post('/videojuego/calificar/:id', (req, res) => {
        const calif = new Calificacion({
            videojuego_id: req.params.id,
            usuario_id: req.body.usuario_id,
            calificacion: req.body.calif,
        });

        calif.save(function (error, calificacion) {
            if (error) { console.log(error); }
            else {
                res.send({
                    videojuego_id: calif.videojuego_id,
                    usuario_id: calif.usuario_id,
                    calificacion: calif.calificacion,
                });
            }
        });
    });

    // Agregar un nuevo videojuego
    app.post('/videojuego', (req, res) => {
        console.log(req.body);
        const nuevoVideojuegos = new EsquemaVideojuego({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            genero: req.body.genero,
            desarrolladora: req.body.desarrolladora,
        });

        nuevoVideojuegos.save((error, videojuego) => {
            if (error) {
                console.error(error);
                res.send(error);
            }
            else {
                res.send(videojuego);
            }
        });
    })
};