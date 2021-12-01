const db = require('../config/covid.db');

module.exports = {   

    async getAll(req, res) {
        const text = "SELECT * FROM casos";
        db.query(text, [[]], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red), err;
                return;
            }

            
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
                if (!total.includes(result.cedula)){
                    total.push(result.cedula);
                    if (result.estado = 'Positivo'){
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
    }

}