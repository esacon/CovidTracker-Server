const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');
const AyudanteController = require('../controllers/ayudante.controller');
const PacienteController = require('../controllers/paciente.controller');
const CasosController = require('../controllers/casos.controller');

// Administrador
router.post('/admin', AdminController.create);
router.get('/admin', AdminController.getAll);
router.get('/admin/:username', AdminController.getByUsername);
router.put('/admin/:id', AdminController.update);
router.delete('/admin/:usuario', AdminController.remove);

// Ayudante.
router.post('/ayudante', AyudanteController.create);
router.get('/ayudante', AyudanteController.getAll);
router.put('/ayudante/:id', AyudanteController.update);
router.delete('/ayudante/:id', AyudanteController.remove);

router.get('/casos', CasosController.getAll);
router.get('/pacientes/:cedula/estados', PacienteController.getEstadosPaciente); 
router.get('/pacientes/:cedula/direcciones', PacienteController.getDireccionesPaciente); // objeto {residencia: [parseFloat(lat), parseFloat(longitud)], trabajo: [parseFloat(lat), parseFloat(longitud)]} valor unico
router.get('/pacientes', PacienteController.getInfoPaciente); // [{residencia: [parseFloat(lat), parseFloat(longitud)], color}]

// Cédula
router.get('/casos/:fecha_inicio/:fecha_fin', CasosController.getAll) // {registrados: [{fecha, cantidad_casos}], }
router.get('/muertos/:fecha_inicio/:fecha_fin', CasosController.getAll) // {}

module.exports = router;