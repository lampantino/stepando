var express = require('express');
var router = express.Router();

//Creamos unas variables que albergue el esquema 'users' y 'sequences'
var users = require('mongoose').model('users');
var sequences = require('mongoose').model('sequences');

//Mediante este método le indicamos que en la ruta '/' debe
//renderizar el archivo index.jade que está dentro de la carpeta
//views. Se le pasa como argumento un objeto json.
router.get('/', function (req, res) {
    res.render(
        'index', {
            title: 'stepando'
        }
    );
});

//Añadimos una página de alta
router.get('/signup', function (req, res) {
    res.render('signup');
});

//Obtenemos la información de la página de alta
router.post('/addUser', function (req, res) {

    //Creamos una variable que sigue el esquema 'users'
    var addUser = new users({
        'name': req.param('name'),
        'surname': req.param('surname'),
        'user': req.param('user'),
        'email': req.param('email'),
        'password': req.param('password')
    });

    //Almacenamos el nuevo usuario
    addUser.save(
        function (err, addUser) {
            if (err) {
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=UTF-8'
                });
                res.write('Hubo un error al almacenar el usuario.');
                res.end();
            } else {
                users.find({}, function (err, users) {
                    if (err) {
                        res.writeHead(200, {
                            'Content-Type': 'text/html; charset=UTF-8'
                        });
                        res.write('Hubo un error al acceder a la lista de usuarios.');
                        res.end();
                    } else {
                        res.redirect('/userslist');
                    }
                });
            }
        }
    );
});

//Página que muestra los usuarios existentes
router.get('/userslist', function (req, res) {
    users.find({},
        function (err, users) {
            if (err) {
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=UTF-8'
                });
                res.write('Hubo un error al acceder a la lista de usuarios.');
                res.end();
            } else {
                res.render(
                    'userslist', {
                        'userslist': users
                    }
                );
            }
        }
    );
});

//Con este método se muestra el formulario de edición de usuario
router.get('/editUser/:id/edit', function (req, res) {
    users.findById(
        req.params.id,
        function (err, user) {
            if (err) {
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=UTF-8'
                });
                res.write('No se encontró el usuario.');
                res.end();
            } else {
                res.render(
                    'edituser', {
                        'user': user
                    });
            }
        }
    );
});

//Con este método modificamos los datos de un usuario según su ID
router.post('/editUser/:id', function (req, res) {
    users.update({
            _id: req.params.id
        }, {
            $set: {
                'name': req.param('name'),
                'surname': req.param('surname'),
                'user': req.param('user'),
                'email': req.param('email'),
                'password': req.param('password')
            }
        },
        function (err, user) {
            if (err) {
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=UTF-8'
                });
                res.write('Hubo un error al modificar los datos del usuario.');
                res.end();
            } else {
                console.log(user);
                res.redirect('/userslist');
            }
        }
    );
});

//Con este método eliminamos un usuario según su ID
router.get('/removeUser/:id', function (req, res) {
    users.remove({
            _id: req.params.id
        },
        function (err) {
            if (err) {
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=UTF-8'
                });
                res.write('Hubo un error al intentar borrar el usuario.');
                res.end();
            } else {
                res.redirect('/userslist');
            }
        }
    );
});

//Página para añadir una secuencia
router.get('/createSequence', function (req, res) {
    users.find({},
        function (err, users) {
            if (err) {
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=UTF-8'
                });
                res.write('Hubo un error al acceder a la lista de usuarios.');
                res.end();
            } else {
                res.render(
                    'createSequence', {
                        'userslist': users
                    }
                );
            }
        }
    );
});

//Obtenemos la información de la página de alta
router.post('/addSequence', function (req, res) {

    //Creamos una variable que sigue el esquema 'sequences'
    var addSequence = new sequences({
        'userId': req.param('userId'),
        'lastUpdate': req.param('lastUpdate'),
        'version': req.param('version'),
        'title': req.param('title'),
        'info': req.param('info')
    });
    
    console.log(addSequence);

    //Almacenamos la nueva secuencia
    addSequence.save(
        function (err, addSequence) {
            if (err) {
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=UTF-8'
                });
                res.write('Hubo un error al almacenar la secuencia.');
                res.end();
            } else {
                sequences.find({}, function (err, sequences) {
                    if (err) {
                        res.writeHead(200, {
                            'Content-Type': 'text/html; charset=UTF-8'
                        });
                        res.write('Hubo un error al acceder a la lista de sequencias.');
                        res.end();
                    } else {
                        res.redirect('/userslist');
                    }
                });
            }
        }
    );
});



//Página que muestra las secuencias de un usuario por su ID
router.get('/sequencesByUser/:id', function (req, res) {
    users.findById(
        req.params.id,
        function (err, user) {
            if (err) {
                res.writeHead(200, {
                    'Content-Type': 'text/html; charset=UTF-8'
                });
                res.write('No se encontró el usuario.');
                res.end();
            } else {
                sequences.find({
                        'userId': req.params.id
                    },
                    function (err, sequences) {
                        if (err) {
                            res.writeHead(200, {
                                'Content-Type': 'text/html; charset=UTF-8'
                            });
                            res.write('Hubo un error al acceder a la lista de secuencias.');
                            res.end();
                        } else {
                            res.render(
                                'sequencesByUser', {
                                    'user': user.name,
                                    'sequenceslist': sequences
                                }
                            );
                        }
                    }
                );
            }
        }
    );
});


//Para añadir más archivos a renderizar utilizar la siguiente expresión:
//router.get('/ruta', function(req, res) {
//  res.render('nombreArchivoJade', { clave: valor });
//});

//Para enviar directamente información sin renderizar utilizar
//la siguiente expresión:
//router.get('/ruta', function(req, res) {
//  res.send(información);
//});

module.exports = router;