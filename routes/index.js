var express = require('express');
var router = express.Router();

//Mediante este método le indicamos que en la ruta '/' debe
//renderizar el archivo index.jade que está dentro de la carpeta
//views. Se le pasa como argumento un objeto json.
router.get('/', function(req, res) {
  res.render('index', { title: 'stepando' });
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
