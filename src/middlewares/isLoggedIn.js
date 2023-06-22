

const isLoggedIn = (req, res, next) => {
    // Check if user is authenticated (logged in)
    if (req.session.user) {
        // User is logged in
        console.log("vibe checked")
        next(); // Proceed to the next middleware or route handler
    } else {
        // User is not logged in
        res.status(401).send('Unauthorized');
    }
};

module.exports = isLoggedIn;