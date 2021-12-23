const fs = require('fs');
const path = require('path');

// this function is called in the get request /api/animals it gets animals by a query or all animals
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

// this function creates a new animal it is called in the post request /api/animals
function createNewAnimal(body, animalsArray) {
    const animal = body;
    animalsArray.push(animal);

    fs.writeFileSync(
        path.join(__dirname, '../data/animals.json'),
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

module.exports = {filterByyQuery,findById,createNewAnimal, validateAnimal};