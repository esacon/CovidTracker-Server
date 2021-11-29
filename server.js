const express = require('express');
const app = express();
const cors = require('cors');
const colors = require('colors');

// Setting

const options = {
  origin: "http://localhost:3000"
};

const PORT = process.env.PORT || 5000;

// Middleware
// Para poder rellenar el req.body
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas
app.use('/api', require('./app/routes/routes.js'));

// Arrancamos el servidor
app.listen(PORT, function () {
    console.log(`Servidor iniciado en el puerto ${PORT}`.green);
});