const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');
const AyudanteController = require('../controllers/ayudante.controller');

// Administrador
router.post('/admin', AdminController.create);
router.get('/admin', AdminController.getAll);
router.get('/admin/:username', AdminController.getByUsername);
router.put('/admin/:id', AdminController.update);
router.delete('/admin/:usuario', AdminController.remove);

// Ayudante.
router.post('/ayudante', AyudanteController.create);
router.get('/ayudante', AyudanteController.getAll);
router.get('/ayudante', AyudanteController.getAll);
router.get('/ayudante/:username', AyudanteController.getByUsername);
router.put('/ayudante/:id', AyudanteController.update);
router.delete('/ayudante/:usuario', AyudanteController.remove);

// Cédula
router.get('/paciente/:id_paciente/estados', AyudanteController.getAll);  // fecha_actualizacion, estado [{}]
router.get('/paciente/:id_paciente/direcciones', AyudanteController.getAll); // objeto {residencia: [parseFloat(lat), parseFloat(longitud)], trabajo: [parseFloat(lat), parseFloat(longitud)]} valor unico
router.get('/paciente', AyudanteController.getAll); // [{residencia: [parseFloat(lat), parseFloat(longitud)], color}]
router.get('/casos')
router.get('/casos/:fecha_inicio/:fecha_fin', AyudanteController.getAll) // {registrados: [{fecha, cantidad_casos}], }
router.get('/muertos/:fecha_inicio/:fecha_fin', AyudanteController.getAll) // {}

module.exports = router;