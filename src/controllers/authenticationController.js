const userService = require("../services/userService")
const session = require('express-session');

const bcrypt = require("bcrypt")

const saltRounds = 10

const register = async (req, res) => {

    const { email, password } = req.body;
    if (await userService.getUserByEmail(email)) {
        res.json({ error: 'already exist ' });
    }
    else {
        try {

            bcrypt.hash(password, saltRounds, async (err, hash) => {
                const password = hash
                const newUser = await userService.createUser({ email, password });
                res.status(201).json({ status: "success" });
            })

        } catch (error) {
            res.status(500).json({ error: 'Failed to create user' });
        }
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;


    const user = await userService.getUserByEmail(email)
    if (!user) {
        res.status(404).json({ error: "can't find the user " });
    }
    else {
        bcrypt.compare(password, user.password, (err, result) => {
            if (!result) {
                res.status(401).json({ error: "password not matching" })
            }

            else {
                req.session.user = { id: user.id }
                console.log(req.session.user)
                res.json({
                    status: "Loged in", id: user.id
                });
            }
        })
    }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.clearCookie('connect.sid', { domain: 'localhost' });
        return res.status(200).json({ message: 'Logged out successfully' });
    });
};

module.exports = {
    register,
    login,
    logout,
};