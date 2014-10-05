var express = require('express');
var router = express.Router();

//Mediante este método le indicamos que en la ruta '/' debe
//renderizar el archivo index.jade que está dentro de la carpeta
//views. Se le pasa como argumento un objeto json.
router.get('/', function(req, res) {
  res.render('index', { title: 'stepando' });
});

//Añadimos una página de alta
router.get('/signup', function(req, res) {
  res.render('signup');
});

//Obtenemos la información de la página de alta
router.post('/addUser', function(req, res) {
    
    //Creamos una variable que albergue el esquema 'users'
    var user = require('mongoose').model('users');
    
    //Creamos una variable que sigue el esquema 'users'
    var addUser = new user({
        'name' : req.param('name'),
        'surname' : req.param('surname'),
        'user' : req.param('user'),
        'email' : req.param('email'),
        'password' : req.param('password')
    });
    
    //Almacenamos el nuevo usuario
    addUser.save(function(err, addUser) {
        if (err) {
            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
            res.write('Hubo un error al almacenar el usuario.');
            res.end();
        } else {
            res.writeHead(200, {'Content-Type': 'text/html; charset=UTF-8'});
            res.write('Usuario ' + addUser.user + ' almacenado con éxito.');
            res.end();
        }
    });
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
