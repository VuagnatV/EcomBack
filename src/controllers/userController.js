const userService = require("../services/userService")

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userService.getUserById(parseInt(id));

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

const getUserCart = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userService.getUserCart(parseInt(id));

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
};

const getUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const user = await userService.getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

const createUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const newUser = await userService.createUser({ email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, password } = req.body;

    try {
        const updatedUser = await userService.updateUser(parseInt(id), { email, password });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};


const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await userService.deleteUser(parseInt(id));
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    getUserCart,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
};