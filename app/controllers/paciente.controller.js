const db = require('../config/covid.db');

module.exports = {

    async getMuertos(req, res) {
        const text = "SELECT cedula FROM casos WHERE estado = 'Muerte'";
        db.query(text, [[]], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red), err;
                return;
            }
            res.status(200).send(info);
        });
    },

    async getResults(req, res) {
        const text = 'SELECT * FROM casos';
        db.query(text, [[]], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red), err;
                return;
            }

            pos = []
            neg = []
            total = []
            info.forEach((result) => {
                if (!total.includes(result.cedula)) {
                    total.push(result.cedula);
                    if (result.estado = 'Positivo') {
                        pos.push(result.estado);
                    } else {
                        neg.pus(result.estado);
                    }
                }
            });

            res.status(200).json({
                cantidad_positivos: pos.length,
                cantidad_negativos: neg.length,
                cantidad_total: total.length
            });
        });
    },

    async getEstadosPaciente(req, res) {
        const text = 'SELECT cedula, fecha_modificacion, estado FROM casos WHERE cedula = ?';
        db.query(text, [[req.params.cedula]], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red), err;
                return;
            }
            res.status(200).json(info);
        });
    },

    async getDireccionesPaciente(req, res) {
        const text = 'SELECT res_lat, res_lng, tra_lat, tra_lng FROM casos WHERE cedula = ? GROUP BY res_lat, res_lng, tra_lat, tra_lng';
        db.query(text, [[req.params.cedula]], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red), err;
                return;
            }
            res.status(200).json({
                residencia: [parseFloat(info[0].res_lat), parseFloat(info[0].res_lng)],
                trabajo: [parseFloat(info[0].tra_lat), parseFloat(info[0].tra_lng)]
            });
        });
    },

    async getInfoPaciente(req, res) {
        const text = 'SELECT Max(id) as id, cedula, res_lat, res_lng, fecha_modificacion, resultado, estado FROM casos GROUP BY cedula ORDER BY cedula';
        db.query(text, [[]], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red), err;
                return;
            }

            const informacion = [];

            info.forEach(result => {
                let color = "";
                if (result.resultado === 'Negativo') {
                    color = "green";
                } else {
                    switch (result.estado) {
                        case 'En tratamiento hospital':
                            color = "yellow";
                            break;
                        case 'En tratamiento casa':
                            color = "yellow";
                            break;
                        case 'En UCI':
                            color = "orange";
                            break;
                        case 'Curado':
                            color = "pink";
                            break;
                        case 'Muerte':
                            color = "red";
                            break;
                        default:
                            break;
                    }
                }

                informacion.push({
                    cedula: result.cedula,
                    residencia: [parseFloat(result.res_lat), parseFloat(result.res_lng)],
                    color: color
                });

            });

            res.status(200).send(informacion);
        });
    }
}