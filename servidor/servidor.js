//paquetes necesarios para el proyecto
let express = require('express');
let bodyParser = require('body-parser');
var cors = require('cors');
let controlador = require('./controladores/controller');
let controladorGeneros = require('./controladores/controladorGeneros');
let controladorInformacion = require('./controladores/controladorInfomacionPel');
let controladorRecomendacion = require('./controladores/controladorRecomendacion');

let app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
//Ruta para obtener películas
app.get('/peliculas', controlador.getAllPeliculas);
//Ruta para obtener géneros de las películas
app.get('/generos', controladorGeneros.getAllgeneros);
//Ruta para obtener las recomendaciones de las películas
app.get('/peliculas/recomendacion', controladorRecomendacion.getRecomendacion);
//Ruta para obtener la información de las películas
app.get('/peliculas/:id', controladorInformacion.getAllinformacion);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '3333';

app.listen(puerto, function () {
  console.log("Escuchando en el puerto " + puerto);
});


