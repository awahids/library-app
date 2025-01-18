const express = require('express');
const inventoryController = require('@/controllers/inventory.controller');
const router = express.Router();

router.post('/inventory', inventoryController.create);
router.get('/inventories', inventoryController.getAll);
router.get('/inventory/:id', inventoryController.getById);
router.put('/inventory/:id', inventoryController.update);
router.delete('/inventory/:id', inventoryController.delete);

module.exports = router;