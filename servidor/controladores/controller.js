const conexion = require('../lib/conexionbd');


module.exports = {
    getAllPeliculas: (req, res) => {
        let anio = req.query.anio;
        let genero = req.query.genero;
        let titulo = req.query.titulo;
        let orden = req.query.columna_orden;
        let tipo = req.query.tipo_orden;
        let cantidad = req.query.cantidad;
        let pagina = req.query.pagina;
        
        let sql = 'SELECT * FROM pelicula';
        let countSql = 'SELECT count(*) as total FROM pelicula';
        let parametros = [];

        // Búsqueda por anio, genero y título
        if (anio && genero && titulo) {
            sql += ' WHERE genero_id = ? AND anio = ? AND titulo LIKE ? ';
            countSql += ' WHERE genero_id = ? AND anio = ? AND titulo LIKE ? ';
            parametros = [parseInt(genero), parseInt(anio), '%' + titulo + '%'];
        } else if (anio && genero) {
            sql += ' WHERE anio = ? AND genero_id = ? ';
            countSql += ' WHERE anio = ? AND genero_id = ? ';
            parametros = [parseInt(anio), parseInt(genero)];
        } else if (anio && titulo) {
            sql += ' WHERE anio = ? AND titulo LIKE ? ';
            countSql += ' WHERE anio = ? AND titulo LIKE ? ';
            parametros = [parseInt(anio), '%' + titulo + '%'];
        } else if (genero && titulo) {
            sql += ' WHERE genero_id = ? AND titulo LIKE ? ';
            countSql += ' WHERE genero_id = ? AND titulo LIKE ? ';
            parametros = [parseInt(genero), '%' + titulo + '%'];
        } else if (anio) {
            sql += ' WHERE anio = ?';
            countSql += ' WHERE anio = ?';
            parametros = [parseInt(anio)];
        } else if (genero) {
            sql += ' WHERE genero_id = ?';
            countSql += ' WHERE genero_id = ?';
            parametros = [parseInt(genero)];
        } else if (titulo) {
            sql += " WHERE titulo LIKE ?";
            countSql += " WHERE titulo LIKE ?";
            parametros = ['%' + titulo + '%'];
        }
        
        //Búsqueda por orden y título
        if (orden && tipo) {
                sql += ' ORDER BY ' + orden + ' ' + tipo;
        }

        //Filtro por resultados
        if (cantidad && parseInt(pagina) >= 1) {
            let offset = (parseInt(pagina) - 1) * parseInt(cantidad);
            sql += ' LIMIT ? OFFSET ? ';
            parametros.push(parseInt(cantidad));
            parametros.push(offset);
        }

        console.log(sql);
        console.log(countSql);
        console.log(parametros);
        
conexion.query(
                sql,
                parametros,
                (error, results, fields) => {
                    if (error) console.error(error);
                    conexion.query(
                        countSql,
                        parametros,
                        (error, resultsCount, fields) => {
                            if (error) console.error(error);
                            res.json({ peliculas: results, total: resultsCount[0].total });
                        }
                    );
                }
            )
        }
    }

       /* var anio = req.query.anio;
        var titulo = req.query.titulo;
        var genero = req.query.genero;
        var columna_orden = req.query.columna_orden;
        var tipo_orden = req.query.tipo_orden;
        var pagina = req.query.pagina;
        var cantidad = req.query.cantidad ? parseInt(req.query.cantidad):10;

        let sql;
        let sql2;
        let countSql = 'SELECT count(*) as total FROM pelicula';
        
        //Búsqueda por anio, titulo y genero
        if (anio && !titulo && !genero) {
            sql = "SELECT * FROM pelicula WHERE anio=" + anio;
        } else if (titulo && !anio && !genero) {
            sql = "SELECT * FROM pelicula WHERE titulo LIKE '%" + titulo + "%'";
        } else if (genero && !titulo && !anio) {
            sql = "SELECT * FROM pelicula WHERE genero_id =" + genero;
        } else if (anio && titulo && genero){
            sql = "SELECT * FROM pelicula WHERE anio=" + anio + " AND titulo LIKE '%" + titulo + "%'" + " AND genero_id =" + genero;
        } else if (!anio && titulo  && genero){
            sql = "SELECT * FROM pelicula WHERE titulo LIKE '%" + titulo + "%'" + " AND genero_id =" + genero;
        } else if (anio && !titulo && genero){
            sql = "SELECT * FROM pelicula WHERE anio=" + anio + "  AND genero_id =" + genero;
        } else if (anio && titulo && !genero){
            sql = "SELECT * FROM pelicula WHERE anio=" + anio + " AND titulo LIKE '%" + titulo + "%'";
        } else {
            sql = "SELECT * FROM pelicula";
        } 
        
        //Búsqueda por orden 
        if (columna_orden == 'titulo'  && tipo_orden == 'ASC') {
            sql2 = sql + " ORDER BY titulo ASC";
            //console.log('entre a titulo');
        } else if (columna_orden == 'anio' &&tipo_orden =='DESC') {
            sql2 = sql + " ORDER BY fecha_lanzamiento DESC";
            //console.log('entre a anio');
        } else if (columna_orden == 'puntuacion' && tipo_orden == 'DESC'){
            sql2 = sql + " ORDER BY puntuacion DESC";
            //console.log('entre a puntuacion');
        } else{
            sql2 =sql;
            //console.log('entre al else');
        }

        
        //Límite a los resultados de las búsquedas
        if (cantidad && parseInt(pagina) >= 1) {
            let offset = (parseInt(pagina) - 1) * parseInt(cantidad);
            sql += ' LIMIT ? OFFSET ? ';
            parametros.push(parseInt(cantidad));
            parametros.push(offset);
        }

        conexion.query(sql2, function (error, results, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
                conexion.query(
                    countSql,
                    (error, resultsCount, fields) => {
                        if (error) console.error(error);
                        res.json({ peliculas: results, total: resultsCount[0].total });
            }
            var response = {
                'peliculas': results,
                'total': results[0]
            };
            res.send(JSON.stringify(response));
        });
    }
*/







    

