const express = require('express');
const authorizationController = require('../controllers/authorization.controller');

const router = express.Router();

// Authorization routes
router.post('/check', authorizationController.checkPermission);
router.get('/permissions', authorizationController.getUserPermissions);
router.get('/roles', authorizationController.getRoles);

module.exports = router;