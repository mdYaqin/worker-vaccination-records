const express = require("express");
const router = express.Router();
const workersController = require("../controllers/workers_controller");
const {
    authenticatedOnly: authenticatedOnlyMiddleware,
    guestOnly: guestOnlyMiddleware,
} = require("../middlewares/auth-middleware");

//show only vaciinated
router.get("/vaccinated", workersController.showVaccinated);

router.get("/not-vaccinated", workersController.showNotVaccinated);
//edit
router.get("/:slug/edit", workersController.editForm);

//new
router.get("/new", workersController.newForm);

//show
router.get("/:slug", workersController.show);

//update
router.patch("/:slug", workersController.update);

//delete
router.delete("/:slug", workersController.delete);

//worker search
router.post("/searchResult", workersController.searchResult);

//dashboard
router.get("/", workersController.index);

//create
router.post("/", workersController.create);
module.exports = router;