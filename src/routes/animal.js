const { Router } = require("express");
const Animal = require("../models/Animal")

const router = Router();

router.post("/", async (req, res, next) => {
    try{
        const animal = Animal(req.body)
        
        const savedAnimal = await animal.save();        
    
        res.status(200).send(savedAnimal);

    }catch(error){
        next(error)
    }
});

router.put("/:id", async (req, res, next) => {
    try{
        const { id } = req.params;        
        await Animal.findByIdAndUpdate(id, req.body, { runValidators: true });
        const animals = await Animal.find().lean();
        
        res.status(200).send(animals);
        
    }catch(error){
        next(error)
    }
});

router.delete("/:id", async (req, res, next) => {
    try{
        const { id } = req.params;        
        await Animal.findByIdAndDelete(id);
        const animals = await Animal.find().lean();
    
        res.status(200).send(animals);

    }catch(error){
        next(error)
    }
});
  
module.exports = router;
