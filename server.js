const fs = require('fs');
const path = require('path');
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
// parse incoming JSON data
app.use(express.json());

const {animals} = require('./data/animals.json');

// this function is called in the get requ;est /api/animals it gets animals by a query
function filterByyQuery(query,animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
    if (query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // If personalityTraits is a string. place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        }else{
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
         // Check the ttrait against each animal in the filtereResults array.
         // Remember it is initially a copy of the animals array
         // but here were updating it for each trait in the .forEach() loop
         // for each trait being targeted by the filter  the filtered results
         // so ata the end we'll have an array of animals that have every one
         // of the traits when the forEach() loop is finished
         filteredResults = filteredResults.filter(
             animal => animal.personalityTraits.indexOf(trait) !== -1
         );
        });
    }
    if(query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if(query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if(query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
};

// this function gets an animal by id its called in the get request /api/animals/:id
function findById(id,animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
};

function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);

    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        JSON.stringify({animals: animalsArray}, null,2)
    );

    return animal;
};

function validateAnimal(animal) {
   if (!animal.name || typeof animal.name !== 'string') {
       return false;
   }
   if(!animal.species || typeof animal.species !== 'string') {
       return false;
   }
   if(!animal.diet || typeof animal.diet !== 'string') {
       return false;
   }
   if(!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
       return false;
   }
   return true;
};


app.get('/api/animals', (req,res) => {
    let results = animals;
    if(req.query) {
        results = filterByyQuery(req.query,results);
    }
 res.json(results);
});

app.get('/api/animals/:id', (req,res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    }else{
        res.sendStatus(404);
    }
});

app.post('/api/animals',(req,res) => {
 // set id based on what the next index of the array wilol be
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

app.listen(PORT, () => {
console.log(`API server now on port 3001`);
});

