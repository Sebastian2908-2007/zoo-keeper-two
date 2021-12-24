const fs = require('fs');
const path = require('path');

function filterByyQuery(query, zookeepers) {
    let filteredResults = zookeepers;
    if(query.age) {
        filteredResults = filteredResults.filter(
            // SInce our form data will be coming in as strings, and our JSON is storing
            // age as anumber, we must convert the query string to a number to
            // perform a comparison:
            (zooKeeper) => zooKeeper.age === Number(query.age)
        );
    }
    if (query.favoriteAnimal) {
        filteredResults = filtered.filter(
            (zooKeeper) => zooKeeper.favoriteAnimal === query.favoriteAnimal 
        );
    }
    if (query.name) {
        filteredResults= filteredResults.filter(
            (zooKeeper) => zooKeeper.name === query.name 
        );
    }
    return filteredResults;
};

function findById(id,zookeepers) {
    const result = zookeepers.filter((zooKeeper) => zooKeeper.id === id)[0];
    return result;
};

function createNewZookeeper(body, zookeepers) {
    const zooKeeper = body;
    zookeepers.push(zooKeeper);
    fs.writeFileSync(
        path.join(__dirname, "../data/zookeepers.json"),
        JSON.stringify({zookeepers},null, 2)
    );
    return zooKeeper;
};

function validateZookeeper(zookeeper) {
    if (!zookeeper.name || typeof zookeeper.name !== "string") {
        return false;
    }
    if (!zookeeper.age || typeof zookeeper.age !== "number") {
        return false;
    }
    if(!zookeeper.favoriteAnimal || typeof zookeeper.favoriteAnimal !== "string") {
        return false;
    }
    return true;
};

module.exports = {
    filterByyQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
};