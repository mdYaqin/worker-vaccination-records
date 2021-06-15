const _ = require("lodash");
const { WorkersModel } = require("../models/workers");
// const {WorkerRatingModel } = require('../models/worker_rating')

module.exports = {
    index: async(req, res) => {
        let workers = [];

        try {
            workers = await WorkersModel.find();
        } catch (err) {
            res.statusCode(500);
            return "server error";
        }

        //validate input
        res.render("workers/index", {
            workers: workers,
        });
    },

    showVaccinated: async(req, res) => {
        let workers = [];
        console.log("hello");
        try {
            workers = await WorkersModel.find({ status: "vaccinated" });
        } catch (err) {
            res.statusCode(500);
            return "server error";
        }

        console.log(workers);
        //validate input
        res.render("workers/index", {
            workers: workers,
        });
    },

    showNotVaccinated: async(req, res) => {
        let workers = [];
        try {
            workers = await WorkersModel.find({ status: "not-vaccinated" });
        } catch (err) {
            res.statusCode(500);
            return "server error";
        }

        //validate input
        res.render("workers/index", {
            workers: workers,
        });
    },

    //
    //
    searchResult: (req, res) => {
        const query = req.body.query;
        let slug = _.kebabCase(query);
        console.log(query, "your input queryddddd");
        let worker = [];
        WorkersModel.findOne({ slug })
            .then((item) => {
                if (!item) {
                    console.log(query, "not found");
                    return;
                }
                worker = item;

                console.log(item, "found");

                return res.render("workers/show", {
                    worker: worker,
                });
            })
            .catch((err) => {
                res.redirect("/workers");
                return;
            });
        console.log(worker);
    },

    newForm: async(req, res) => {
        const messages = await req.consumeFlash("error");

        res.render("workers/new", {
            messages: messages,
        });
        return;
    },

    show: (req, res) => {
        let worker = {};
        WorkersModel.findOne({ slug: req.params.slug })
            .then((item) => {
                // if item not found, redirect to the homepage
                if (!item) {
                    res.redirect("/workers");
                    return;
                }

                worker = item;

                // //get worker ratings from DB
                // return WorkerRatingModel.find({ worker_id: item._id}).sort({created_at: -1})
            })
            .then((ratings) => {
                res.render("workers/show", {
                    worker: worker,
                    ratings: ratings,
                });
            })
            .catch((err) => {
                res.redirect("/workers");
            });
    },

    create: async(req, res) => {
        //validate input
        if (!req.body.name) {
            await req.flash("error", "Please enter a valid ID");

            res.redirect("/workers/new");
            return;
        }

        let slug = _.kebabCase(req.body.name);

        let { name, image, address, contact, status } = req.body;

        console.log(name, image, address, contact, status, slug);
        WorkersModel.create({
                name,
                image,
                address,
                contact,
                status,
                slug,
            })
            .then((createResp) => {
                console.log(1);
                res.redirect("/workers");
                return;
            })
            .catch((err) => {
                console.log(2);
                res.redirect("/workers/new");
                return;
            });
    },

    editForm: (req, res) => {
        WorkersModel.findOne({ slug: req.params.slug })
            .then((item) => {
                res.render("workers/edit", {
                    worker: item,
                });
            })
            .catch((err) => {
                res.redirect("/workers");
            });
    },

    update: (req, res) => {
        let newSlug = _.kebabCase(req.body.name);

        WorkersModel.updateOne({ slug: req.params.slug }, {
            $set: {
                name: req.body.name,
                image: req.body.image,
                address: req.body.address,
                contact: req.body.contact,
                status: req.body.status,
                slug: newSlug,
            },
        })

        .then((updateResp) => {
                res.redirect("/workers/");
            })
            .catch((err) => {
                res.redirect("/workers/" + req.params.slug + "/show");
            });
    },

    delete: (req, res) => {
        WorkersModel.deleteOne({ slug: req.params.slug })
            .then((deleteResp) => {
                res.redirect("/workers");
            })
            .catch((err) => {
                res.redirect("/workers");
            });
    },
};