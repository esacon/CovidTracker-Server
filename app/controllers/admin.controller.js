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
        const id = parseInt(req.params.id);
        const { nombre, apellido, cedula, rol, usuario, contraseña} = req.body;

        const text = "UPDATE usuarios SET nombre = ?, apellido = ?, cedula = ?, rol = ?, contraseña = ? WHERE id = ?";
        const values = [nombre, apellido, cedula, rol, contraseña, id];
        db.query(text, [values], (err, info) => {
            if (err) {s
                console.log("No se pudo ejecutar el query.".red), err;
                return;
            }
            res.status(200).send({ message: "Usuario actualizados correctamente!" });
        });
    },

    async remove(req, res) {
        const usuario = req.params.usuario;
        const text = 'DELETE FROM usuarios WHERE usuario = ?';
        const values = [usuario];
        db.query(text, [values], (err, info) => {
            if (err) {
                console.log("No se pudo ejecutar el query.".red), err;
                return;
            }
            res.status(200).send({ message: 'Usuario deleted successfully!', usuario });
        });
    }
}