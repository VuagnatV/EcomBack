
const isAdmin = (req, res, next) => {
    // Check if user is authenticated (logged in)
    if (req.session.user) {
        if (req.session.user.role === "admin") {
            // User is logged in
            console.log("admin checked")
            next(); // Proceed to the next middleware or route handler
        } else {
            // User is not logged in
            res.status(401).send('Unauthorized');
        }
    } else {
        // User is not logged in
        res.status(401).send('Unauthorized');
    }

};

module.exports = isAdmin;