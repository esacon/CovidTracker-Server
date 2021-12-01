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


}