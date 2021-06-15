const { UserModel } = require("../models/users");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const { createHash } = require("crypto");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
    registerForm: (req, res) => {
        res.render("users/register");
        return;
    },

    loginForm: (req, res) => {
        res.render("users/login");
        return;
    },

    registerUser: async(req, res) => {
        // validate first & last name
        if (!req.body.first_name || !req.body.last_name) {
            console.log(1)
            res.redirect("/register");
            return;
        }

        // ensure password and confirm password matches
        if (req.body.password !== req.body.password_confirm) {
            console.log(2)
            res.redirect("/register");
            return;
        }

        // ensure that there is no existing user account with the same email given
        let user = null;
        try {
            user = await UserModel.findOne({ email: req.body.email });
        } catch (err) {
            console.log(3);
            res.redirect("/register");
            return;
        }
        if (user) {
            console.log(4)
            res.redirect("/register");
            return;
        }

        const timestampNow = moment().utc();

        // hashing using sha256
        // const salt = uuidv4()
        // const saltedPassword = salt + req.body.password
        // const hashInstance = createHash('sha256')
        // hashInstance.update(saltedPassword)

        // hashing using bcrypt
        const generatedHash = await bcrypt.hash(req.body.password, saltRounds);

        try {
            await UserModel.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                // pwsalt: salt,
                // hash: hashInstance.digest('hex'),
                hash: generatedHash,
                created_at: timestampNow,
                updated_at: timestampNow,
            });
        } catch (err) {
            console.log(5);
            res.redirect("/register");
            return;
        }
        console.log(6)
        res.redirect("/workers");

        return;
    },

    loginUser: async(req, res) => {
        let user = null;

        try {
            user = await UserModel.findOne({ email: req.body.email });
        } catch (err) {
            console.log(err);
            res.redirect("/dashboard");
            return;
        }

        if (!user) {
            res.redirect("/register");
            return;
        }

        // try to check if given password is correct
        // const saltedPassword = user.pwsalt + req.body.password
        // const hashInstance = createHash('sha256')
        // hashInstance.update(saltedPassword)
        // const hashedPassword = hashInstance.digest('hex')

        // compare hashed passwords against hash in db
        // if (hashedPassword !== user.hash) {
        //     res.redirect('/users/register')
        //     return
        // }

        const isValidPassword = await bcrypt.compare(req.body.password, user.hash);
        if (!isValidPassword) {
            res.redirect("/register");
            return;
        }

        req.session.user = user;
        res.redirect("/dashboard");
        return;
    },

    dashboard: (req, res) => {
        res.render("users/dashboard");
        return;
    },

    logout: (req, res) => {
        req.session.destroy();
        res.redirect("/");
        return;
    },
};