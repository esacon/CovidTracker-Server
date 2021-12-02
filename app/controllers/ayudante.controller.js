const db = require('../config/covid.db');

module.exports = {

    async create(req, res) {
        console.log(req.body)
        const { nombre, apellido, cedula, sexo, fecha_nacimiento, dir_residencia, res_lat, res_lng, dir_trabajo, tra_lat, tra_lng, resultado, fecha_examen, estado } = req.body;

        console.log(cedula, parseInt(cedula))

        const current_date = String((new Date(Date.now())).toISOString().slice(0, 10)).replace(/-/g, '/');

        const text = "INSERT INTO casos (id, nombre, apellido, cedula, sexo, fecha_nacimiento, dir_residencia, res_lat, res_lng, dir_trabajo, tra_lat, tra_lng, resultado, fecha_examen, estado, fecha_modificacion) VALUES (?)";
        const values = [null, nombre, apellido, parseInt(cedula), sexo, fecha_nacimiento, dir_residencia, parseFloat(res_lat), parseFloat(res_lng), dir_trabajo, parseFloat(tra_lat), parseFloat(tra_lng), resultado, fecha_examen, estado, current_date];
        
        db.query(text, [values], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red);
                res.status(500).send({ message: "0" });
            } else{
                console.log("Caso registrado correctamente.".gray);
                res.status(200).send({ message: "1" });
            }            
        });
    },

    async getAll(req, res) {
        const text = "SELECT * FROM casos";
        db.query(text, (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red), err;
                return;
            }
            res.send(info);
        });
    },

    async update(req, res) {
        const id = parseInt(req.params.id);

        const current_date = (new Date(Date.now())).toISOString().slice(0, 10).replace('-', '/');
        const { dir_residencia, res_lat, res_lng, dir_trabajo, tra_lat, tra_lng, estado } = req.body;

        const text = "UPDATE casos SET dir_residencia = ?, res_lat = ?, res_lng = ?, dir_trabajo = ?, tra_lat = ?, tra_lng = ?, estado = ?, fecha_modificacion = ? WHERE id = ?";
        const values = [dir_residencia, parseFloat(res_lat), parseFloat(res_lng), dir_trabajo, parseFloat(tra_lat), parseFloat(tra_lng), estado, current_date, id];

        db.query(text, [values], (err, info) => {
            if (err) {s
                console.log("No se pudo ejecutar el query.".red), err;
                return;
            }
            res.status(200).send({ message: "Caso actualizado correctamente!" });
        });
    },

    async remove(req, res) {
        const cedula = parseInt(req.params.cedula);
        console.log(req)
        const text = 'DELETE FROM usuarios WHERE cedula = ?';
        const values = [cedula];
        db.query(text, [values], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red, err);
                return;
            }
            console.log('Usuario eliminado.')
            res.status(200).send({ message: 'Caso eliminado exitosamente!', cedula });
        });
    }

}