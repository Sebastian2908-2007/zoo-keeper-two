const router = require('express').Router();
const {filterByyQuery,findById,createNewAnimal,validateAnimal} = require('../../lib/animals');
const {animals} = require('../../data/animals');


// route for getting all animals or getting them by specific query
router.get('/animals', (req,res) => {
    let results = animals;
    if(req.query) {
        results = filterByyQuery(req.query,results);
    }
 res.json(results);
});

// route for getting animals by their id
router.get('/animals/:id', (req,res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    }else{
        res.sendStatus(404);
    }
});

// route for posting animals
router.post('/animals',(req,res) => {
 // set id based on array length
 req.body.id = animals.length.toString();

 // if any data in the req.body is incorrect ,send a 400 errror back
 if(!validateAnimal(req.body)) {
     res.status(400).send('The animal is not properly formatted.');
 }else{ 
 // add animal to json file and animals array in this function
 const animal = createNewAnimal(req.body, animals)

 res.json(animal);
 }
});

module.exports = router;