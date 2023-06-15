const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllUsers = async () => {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        throw new Error('Failed to retrieve users');
    }
};

const getUserById = async (userId) => {
    try {
        console.log(userId)
        const user = await prisma.user.findUnique({ where: { id: userId } });
        return user;
    } catch (error) {
        throw new Error("Failed to retrieve user");
    }
};

const createUser = async (userData) => {
    try {
        const newUser = await prisma.user.create({ data: userData });
        return newUser;
    } catch (error) {
        throw new Error('Failed to create user');
    }
};

const updateUser = async (userId, userData) => {
    try {
        const updatedUser = await prisma.user.update({ where: { id: userId }, data: userData });
        return updatedUser;
    } catch (error) {
        console.log(error)
        throw new Error('Failed to update user');
    }
};

const deleteUser = async (userId) => {
    try {
        await prisma.user.delete({ where: { id: userId } });
    } catch (error) {
        throw new Error('Failed to delete user');
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};