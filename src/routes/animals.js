const { Router } = require("express");
const Animal = require("../models/Animal");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    
    const animals = await Animal.find();
    res.send(animals);

  } catch (error) {
    
    next(error);
    
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;    
    const animal = await Animal.findById(id).lean();    
    res.send(animal);

  } catch (error) {
    
    next(error);
    
  }
});

module.exports = router;
