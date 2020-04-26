const conexion = require('../lib/conexionbd');

module.exports = {
    getAllgeneros: (req, res) => {
        let sql = "select * from genero";

        conexion.query(sql, function (error, results, fields) {
            if (error) {
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            var response = {
                'generos': results
            };
            res.send(JSON.stringify(response));
        });
    }
}