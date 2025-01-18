const inventoryService = require('@/services/inventory.service');

const create = async (req, res) => {
    try {
        const { location } = req.body;
        if (!location) {
            return res.status(400).json({ error: 'Location is required' });
        }
        const newInventory = await inventoryService.createInventory(location);
        res.status(201).json(newInventory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create inventory' });
    }
};

const getAll = async (req, res) => {
    try {
        const inventories = await inventoryService.getAllInventories();
        res.status(200).json(inventories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch inventories' });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }
        const inventory = await inventoryService.getInventoryById(id);
        if (!inventory) {
            return res.status(404).json({ error: 'Inventory not found' });
        }
        res.status(200).json(inventory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch inventory' });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { location } = req.body;
        if (!id || !location) {
            return res.status(400).json({ error: 'ID and location are required' });
        }
        const updatedInventory = await inventoryService.updateInventory(id, location);
        res.status(200).json(updatedInventory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update inventory' });
    }
};

const deleteInventory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'ID is required' });
        }
        await inventoryService.deleteInventory(id);
        res.status(204).send(); // No content
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete inventory' });
    }
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    delete: deleteInventory, 
};