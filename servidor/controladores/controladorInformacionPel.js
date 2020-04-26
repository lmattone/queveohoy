const conexion = require('../lib/conexionbd');

module.exports = {

    getAllinformacion: (req, res) => {

        let peliculaId = req.params.id;

        conexion.query(
            "SELECT * FROM pelicula WHERE id = ?",
            [peliculaId],
            (error, peliculas, fields) => {
                if (error) return console.error(error);

                if (peliculas.length > 0) { //Si las cantidad de películas es mayor a 0
                    let pelicula = peliculas[0]; // Muestra el primer resultado
                    let generoId = pelicula.genero_id; // el género correspondiente a la película seleccionada

                    conexion.query(
                        "SELECT  * FROM genero WHERE id = ?",
                        [generoId],
                        (error, generos, fields) => {
                            if (error) return console.error(error);

                            let genero = generos[0]; // Muestra el resultado del primer genero que coincida con el id

                            conexion.query(
                                //Query solicitando el actor que trabaje en la pelicula seleccionada
                                "SELECT a.* FROM actor_pelicula ap JOIN actor a ON a.id = ap.actor_id WHERE ap.pelicula_id = ?",
                                [peliculaId],
                                (error, actores, fields) => {
                                    if (error) return console.error(error);

                                    res.json({
                                        pelicula: pelicula,
                                        actores: actores,
                                        genero: genero
                                    });
                                }
                            );
                        }
                    );
                }
            }
        );

    }
}
