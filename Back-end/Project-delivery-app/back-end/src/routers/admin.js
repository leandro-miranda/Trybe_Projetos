const express = require('express');
const adminController = require('../controllers/admin.controller');
const validateAdmin = require('../middlewares/admin');

const router = express.Router();

router.get('/', (req, res) => adminController.getAdminUsers(req, res));
router.post('/', validateAdmin, (req, res) => adminController.postAdminUser(req, res));
router.delete('/:email', adminController.deleteAdminUser);
module.exports = router;