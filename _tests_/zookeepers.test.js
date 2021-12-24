const fs = require('fs');
const {
    filterByyQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require('../lib/zookeepers');
const {zookeepers}  = require('../data/zookeepers.json');
jest.mock('fs');

test('creates new zookeeper object', () => {
   const zooKeeper = createNewZookeeper({name: "jerry" ,age:38 , favoriteAnimal: "walrus"},
   zookeepers
   );

   expect(zooKeeper.name).toBe('jerry');
   expect(zooKeeper.age).toBe(38);
   expect(zooKeeper.favoriteAnimal).toBe("walrus");
});

test('this tests the filter by query function for zookeepers', () => {
    startingZookeepers = [
        {
            id: "8",
            name: "jerry",
            age: 38,
            favoriteAnimal:"walrus"
        },
        {
            id: "9",
            name: "Todd",
            age: 36,
            favoriteAnimal: "bat"
        },

    ];
    const updatedZookeepers = filterByyQuery({name:"jerry"},startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test('finds zookeeper by id', () => {
    startingZookeepers = [
        {
            id: "8",
            name: "jerry",
            age: 38,
            favoriteAnimal:"walrus"
        },
        {
            id: "9",
            name: "Todd",
            age: 36,
            favoriteAnimal: "bat"
        }, 
    ];

    const result = findById("8",startingZookeepers);
    expect(result.name).toBe("jerry");
});

test('validates for favoriteAnimal', () => {
    goodZookeeper =   {
        id: "8",
        name: "jerry",
        age: 38,
        favoriteAnimal:"walrus"
    }

    badZookeeper =  {
        id: "9",
        name: "Todd",
        age: 36,
    }

    resultGood = validateZookeeper(goodZookeeper);
    resultNoGood = validateZookeeper(badZookeeper);

    expect(resultGood).toBe(true);
    expect(resultNoGood).toBe(false);
});