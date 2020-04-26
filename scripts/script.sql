/* GUÍA PARTE 1 - PASO ...*/

/* CREO LA BASE DE DATOS  queveohoy */
CREATE DATABASE queveohoy;

USE queveohoy;

/*CREO LA TABLA PELICULA*/
CREATE TABLE pelicula(
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(100),
    duracion INT(5),
    director VARCHAR(400),
    anio INT(5),
    fecha_lanzamiento DATE,
    puntuacion INT(2),
    poster VARCHAR(300),
    trama VARCHAR(700),
   PRIMARY KEY(id)
);

/*CHEQUEO QUE ESTE BIEN HECHA LA TABLA PELICULA*/
SELECT * FROM pelicula;

/* CREO LA TABLA GENERO */
CREATE TABLE genero(
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(30),
    PRIMARY KEY(id)
);

/* AGREGO EL CAMPO genero_id en la tabla pelicula*/
ALTER table pelicula ADD COLUMN genero_id INT NOT NULL DEFAULT 1;


/* CONVIERTO EL CAMPO genero_id EN LA FOREIGN KEY DE LA TABLA pelicula*/
ALTER table pelicula ADD FOREIGN KEY (genero_id) REFERENCES genero(id);

/*LUEGO EJECUTO LOS  UPDATES DEL SCRIPT PASO 2*/

/* GUÍA PARTE 3 - PASO1 */
/* CREO LA TABLA actor */
CREATE TABLE actor(
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(70),
    PRIMARY KEY(id)
);

/* CREO LA TABLA actor_pelicula */
CREATE TABLE actor_pelicula(
    id INT NOT NULL AUTO_INCREMENT,
    actor_id INT NOT NULL,
    pelicula_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (actor_id)REFERENCES actor(id),
    FOREIGN KEY(pelicula_id) REFERENCES pelicula(id)
);

/* GUÍA PARTE 3 - PASO 2*/

/*LUEGO AGREGO LOS  UPDATES DEL SCRIPT PASO 2*/



