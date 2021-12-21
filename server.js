const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const {animals} = require('./data/animals.json');

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

function findById(id,animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
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

app.listen(PORT, () => {
console.log(`API server now on port 3001`);
});

