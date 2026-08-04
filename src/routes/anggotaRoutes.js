const express = require('express');
const router = express.Router();
const anggotaController = require('../controllers/anggotaController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protect all anggota routes with JWT authentication
router.use(authMiddleware);

router.get('/', anggotaController.getAllAnggota);
router.get('/:id', anggotaController.getAnggotaById);
router.post('/', anggotaController.addAnggota);
router.put('/:id', anggotaController.updateAnggota);
router.delete('/:id', anggotaController.deleteAnggota);

module.exports = router;
