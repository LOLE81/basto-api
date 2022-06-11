const { Router } = require("express");
const Animal = require("../models/Animal")

const router = Router();

router.post("/", async (req, res, next) => {
    try{
        const animal = Animal(req.body)
        
        const savedAnimal = await animal.save();
    
        console.log(savedAnimal)
    
        res.send(savedAnimal);

    }catch(error){
        next(error)
    }
});

router.put("/:id", async (req, res, next) => {
    try{
        const { id } = req.params;        
        await Animal.findByIdAndUpdate(id, req.body);
        const ani = await Animal.findById(id).lean();
        
        console.log(ani)
    
        res.send(ani);

    }catch(error){
        next(error)
    }
});

router.delete("/:id", async (req, res, next) => {
    try{
        const { id } = req.params;        
        await Animal.findByIdAndDelete(id);        
    
        res.send('deleted');

    }catch(error){
        next(error)
    }
});
  
module.exports = router;
