module.exports = {
    authenticatedOnly: (req, res, next) => {
        // if session is valid, go to the next stage
        if (req.session && req.session.user) {
            next();
            return;
        }

        res.redirect("/login");
    },

    guestOnly: (req, res, next) => {
        // if is not logged-in, allow request to proceed
        if (!req.session || !req.session.user) {
            next();
            return;
        }

        res.redirect("/dashboard");
    },

    setUserVarMiddleware: (req, res, next) => {
        res.locals.user = null;

        if (req.session && req.session.user) {
            res.locals.user = req.session.user;
        }

        next();
    },
};