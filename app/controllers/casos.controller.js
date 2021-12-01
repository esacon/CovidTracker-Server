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

    async getAllCasos(req, res) {

        const { fecha_inicio, fecha_fin } = req.params;

        let text = `SELECT C.fecha_modificacion, COUNT(*) as cantidad_total
                    FROM (
                        SELECT Min(id) as id, estado, fecha_modificacion FROM casos GROUP BY cedula
                    ) C
                    WHERE  C.fecha_modificacion BETWEEN '${fecha_inicio}' AND '${fecha_fin}'
                    GROUP BY C.fecha_modificacion
                    ORDER BY C.fecha_modificacion ASC;`;

        const fechas = [];
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
                    SELECT Max(id) as id, fecha_modificacion FROM casos WHERE estado = 'Muerte' GROUP BY cedula
                ) C
                WHERE  C.fecha_modificacion BETWEEN '${fecha_inicio}' AND '${fecha_fin}'
                GROUP BY C.fecha_modificacion
                ORDER BY C.fecha_modificacion ASC;`;

        db.query(text, [[]], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red), err;
                return;
            }

            const fechas_info = [];

            info.forEach(element => {
                fechas_info.push(element.fecha_modificacion);
            });

            let i = 0;
            fechas.forEach(fecha => {
                if (fechas_info.includes(fecha)) {
                    total_muertes.push(info[i].cantidad_total);
                    i++;
                } else {
                    total_muertes.push(0);
                }
            });

            res.status(200).json({
                fechas: fechas,
                totales: total,
                totales_muertes: total_muertes
            });
        });
    },

    async getAllInfo(req, res) {

        let text = `SELECT resultado, Count(*) as cantidad
                    FROM (
                        SELECT Max(id) as id, resultado, fecha_modificacion FROM casos GROUP BY cedula
                    ) C
                    GROUP BY C.resultado;`;

        let cantidad_positivos;
        let cantidad_negativos;

        db.query(text, [[]], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red, err);
                return;
            }

            console.log(info)
            if (info.length > 0) {
                cantidad_positivos = info[0].cantidad;
            } else if (info.length > 1){                
                cantidad_negativos = info[1].cantidad;
            }
        });

        text = `SELECT estado
                FROM (
                    SELECT Max(id) as id, estado, fecha_modificacion FROM casos GROUP BY cedula
                ) C;`;

        const cantidad_infectados = [];
        const cantidad_muertes = [];
        const cantidad_curados = [];
        const cantidad_hospital = [];
        const cantidad_casa = [];
        const cantidad_uci = [];


        db.query(text, [[]], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red), err;
                return;
            }
            info.forEach(caso => {
                if (caso.estado !== null) {
                    if (caso.estado !== 'Muerte' || caso.estado !== 'Curado') {
                        cantidad_infectados.push(caso);
                    }
                }
                if (caso.estado === 'Curado') {
                    cantidad_curados.push(caso);
                } else if (caso.estado === 'Muerte') {
                    cantidad_muertes.push(caso);
                } else if (caso.estado === 'En tratamiento hospital') {
                    cantidad_hospital.push(caso);
                } else if (caso.estado === 'En tratamiento en casa') {
                    cantidad_casa.push(caso);
                } else if (caso.estado === 'En UCI') {
                    cantidad_uci.push(caso);
                }
            });

            res.status(200).json({
                cantidad_positivos: cantidad_positivos,
                cantidad_negativos: cantidad_negativos,
                cantidad_infectados: cantidad_infectados.length,
                cantidad_muertes: cantidad_muertes.length,
                cantidad_curados: cantidad_curados.length,
                cantidad_hospital: cantidad_hospital.length,
                cantidad_casa: cantidad_casa.length,
                cantidad_uci: cantidad_uci.length
            });
        });
    }

}