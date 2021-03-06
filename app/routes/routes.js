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
router.put('/admin/:cedula', AdminController.update);
router.delete('/admin/:id', AdminController.remove);

// Ayudante.
router.post('/ayudante', AyudanteController.create);
router.get('/ayudante', AyudanteController.getAll);
router.put('/ayudante/:id', AyudanteController.update);
router.delete('/ayudante/:cedula', AyudanteController.remove);

// Consulta de casos
router.get('/casos', CasosController.getAll);
router.get('/casos&:fecha_inicio(*)&:fecha_fin(*)', CasosController.getAllCasos);
router.get('/casos/info', CasosController.getAllInfo);  

// Consulta de pacientes
router.get('/pacientes/:cedula/estados', PacienteController.getEstadosPaciente); 
router.get('/pacientes/:cedula/direcciones', PacienteController.getDireccionesPaciente);
router.get('/pacientes', PacienteController.getInfoPaciente);
router.get('/pacientes/muertos', PacienteController.getMuertos);

module.exports = router;