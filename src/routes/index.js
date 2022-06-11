const { Router } = require("express");
const animalsRouter = require("./animals");
const animalRouter = require("./animal");

const router = Router();

//Routes configuration:
router.use("/animals", animalsRouter);
router.use("/animal", animalRouter);

module.exports = router;
