const express = require('express');
const router = express.Router();

const AdminController = require('../controllers/admin.controller');

// Administrador
router.post('/admin', AdminController.create);
router.get('/admin', AdminController.getAll);
router.get('/admin/:username', AdminController.getByUsername);
router.put('/admin/:id', AdminController.update);
router.delete('/admin/:usuario', AdminController.remove);

module.exports = router;