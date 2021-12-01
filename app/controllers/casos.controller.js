const db = require('../config/covid.db');

module.exports = {    
    
    async getAll(req, res) {
        const text = "SELECT * FROM casos";
        db.query(text, [[]], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red), err;
                return;
            }

            const casos = [];
            const cedulas = [];
            info.forEach(caso => {
                if (!cedulas.includes(caso.cedula)) {
                    cedulas.push(caso.cedula);
                    casos.push(caso);
                }
            });

            res.status(200).json({
                casos: casos
            });            
        });
    },

    async getAll(req, res) {

        const { fecha_inicio, fecha_fin } = req.params;

        let text = `SELECT C.fecha_modificacion, COUNT(*) as cantidad_total
                    FROM (
                        SELECT Min(id) as id, estado, fecha_modificacion FROM casos GROUP BY cedula
                    ) C
                    WHERE  C.fecha_modificacion BETWEEN '${fecha_inicio}' AND '${fecha_fin}'
                    GROUP BY C.fecha_modificacion
                    ORDER BY C.fecha_modificacion ASC;`;

        const fechas = [];
        const fechas_muertes = [];
        const total = [];
        const total_muertes = [];

        db.query(text, [[]], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red, err);
                return;
            }
            info.forEach(caso => {
                fechas.push(caso.fecha_modificacion);
                total.push(caso.cantidad_total);
            });
        });

        text = `SELECT C.fecha_modificacion, COUNT(*) as cantidad_total
                FROM (
                    SELECT Min(id) as id, fecha_modificacion FROM casos WHERE  estado = 'Muerte' GROUP BY cedula
                ) C
                WHERE  C.fecha_modificacion BETWEEN '${fecha_inicio}' AND '${fecha_fin}'
                GROUP BY C.fecha_modificacion
                ORDER BY C.fecha_modificacion ASC;`;

        db.query(text, [[]], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red), err;
                return;
            }
            info.forEach(caso => {
                fechas_muertes.push(caso.fecha_modificacion);
                total_muertes.push(caso.cantidad_total);
            });
            
            res.status(200).json({
                fechas: fechas,
                totales: total,
                fechas_muertes: fechas_muertes,
                totales_muertes: total_muertes
            });
        });
    },

}