const db = require('../config/covid.db');

module.exports = {

    async create(req, res) {
        const { nombre, apellido, cedula, rol, usuario, contraseña } = req.body;

        const id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));

        const text = "INSERT INTO usuarios (id, nombre, apellido, cedula, rol, usuario, contraseña) VALUES (?)";
        const values = [id, nombre, apellido, parseInt(cedula), parseInt(rol), usuario, contraseña];
        
        db.query(text, [values], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red);
                res.status(500).send({ message: "0" });
            } else{
                res.status(200).send({ message: "1" });
            }            
        });
    },

    async getAll(req, res) {
        const text = "SELECT * FROM usuarios";
        db.query(text, (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red), err;
                return;
            }
            res.send(info);
        });
    },

    async getByUsername(req, res) {
        const username = req.params.username;
        db.query('SELECT * FROM usuarios WHERE usuario = ?', [[username]], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red), err;
                return;
            }
            res.send(info);
        });
    }, 

    async update(req, res) {
        const id = parseInt(req.params.cedula);
        const { rol, password } = req.body;

        console.log(req.body, req.params.cedula);

        const text = `UPDATE usuarios SET rol = ${rol}, contraseña = '${password}' WHERE cedula = ${id}`;
        const values = [];
        db.query(text, [values], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red, err);
                return;
            }
            res.status(200).send({ message: "Usuario actualizados correctamente!" });
        });
    },

    async remove(req, res) {
        const id = parseInt(req.params.id);
        const text = 'DELETE FROM casos WHERE id = ?';
        const values = [id];
        db.query(text, [values], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red), err;
                return;
            }
            res.status(200).send({ message: 'Caso deleted successfully!', id });
        });
    }
}