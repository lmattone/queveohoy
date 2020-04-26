const conexion = require('../lib/conexionbd');

module.exports = {

    getRecomendacion: (req, res) => {
        //genero = Adventure & anio_inicio=1900 & anio_fin=2005

        let genero = req.query.genero;
        let anio_inicio = req.query.anio_inicio;
        let anio_fin = req.query.anio_fin;
        let puntuacion = req.query.puntuacion;


        let sql = 'SELECT * FROM pelicula p JOIN genero g ON p.genero_id = g.id';
        let parametros = [];

        if (genero) {
            sql += ' WHERE g.nombre = ? ';
            parametros.push(genero);
        }

        if (anio_inicio) {
            if (parametros.length > 0) {
                sql += ' AND ';
            } else {
                sql += ' WHERE ';
            }

            sql += ' anio > ? ';
            parametros.push(parseInt(anio_inicio));
        }

        if (anio_fin) {
            if (parametros.length > 0) {
                sql += ' AND ';
            } else {
                sql += ' WHERE ';
            }

            sql += ' anio < ? ';
            parametros.push(parseInt(anio_fin));
        }

        if (puntuacion) {
            if (parametros.length > 0) {
                sql += ' AND ';
            } else {
                sql += ' WHERE ';
            }

            sql += ' puntuacion = ? ';
            parametros.push(parseInt(puntuacion));
        }

        console.log(sql);
        console.log(parametros);

        conexion.query(
            sql,
            parametros,
            (error, results, fields) => {
                if (error) console.error(error);

                res.json({ peliculas: results });

            }
        )
    }
}




