const { prisma } = require('@/configs/database'); 

const createInventory = async (location) => {
    try {
        return await prisma.inventory.create({
            data: { location },
        });
    } catch (error) {
        throw new Error(`Failed to create inventory: ${error.message}`);
    }
};

const getAllInventories = async () => {
    try {
        return await prisma.inventory.findMany();
    } catch (error) {
        throw new Error(`Failed to retrieve inventories: ${error.message}`);
    }
};

const getInventoryById = async (id) => {
    try {
        const inventory = await prisma.inventory.findUnique({
            where: { id: parseInt(id) },
        });
        if (!inventory) {
            throw new Error(`Inventory with id ${id} not found`);
        }
        return inventory;
    } catch (error) {
        throw new Error(`Failed to retrieve inventory: ${error.message}`);
    }
};

const updateInventory = async (id, location) => {
    try {
        const inventory = await prisma.inventory.findUnique({
            where: { id: parseInt(id) },
        });
        if (!inventory) {
            throw new Error(`Inventory with id ${id} not found`);
        }
        return await prisma.inventory.update({
            where: { id: parseInt(id) },
            data: { location },
        });
    } catch (error) {
        throw new Error(`Failed to update inventory: ${error.message}`);
    }
};

const deleteInventory = async (id) => {
    try {
        const inventory = await prisma.inventory.findUnique({
            where: { id: parseInt(id) },
        });
        if (!inventory) {
            throw new Error(`Inventory with id ${id} not found`);
        }
        return await prisma.inventory.delete({
            where: { id: parseInt(id) },
        });
    } catch (error) {
        throw new Error(`Failed to delete inventory: ${error.message}`);
    }
};

module.exports = {
    createInventory,
    getAllInventories,
    getInventoryById,
    updateInventory,
    deleteInventory,
};