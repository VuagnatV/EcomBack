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



const getUserByEmail = async (email) => {
    try {
        const user = await prisma.user.findUnique({ where: { email: email } });
        return user;
    } catch (error) {
        throw new Error("Failed to retrieve user");
    }
};

const getByCredentials = async (email, password) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email,
                password
            }
        });
        return user;
    } catch (error) {
        throw new Error(error);
    }
}

const createUser = async (email, password) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                email,
                password,
                role: "user"
            }
        });
        return newUser;
    } catch (error) {
        console.log(error)
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
    getUserByEmail,
    getByCredentials,
    createUser,
    updateUser,
    deleteUser,
};